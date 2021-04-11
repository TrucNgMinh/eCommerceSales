using System;
using System.Linq;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System.IO;
using System.Reflection;
using Microsoft.AspNet.OData.Formatter;
using Microsoft.Net.Http.Headers;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Threading.Tasks;
using Coravel;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using Newtonsoft.Json.Serialization;
using Microsoft.OData.Edm;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using iNet.Common;
using iNet.Context.Services.Impl;

namespace iNetEcommerce
{
    public class Startup
    {
        /// <summary>
        /// Startup with Environment
        /// </summary>
        /// <param name="env"></param>
        public Startup(IHostingEnvironment env)
        {
          var builder = new ConfigurationBuilder()
              .SetBasePath(env.ContentRootPath)
              .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
              .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
              .AddEnvironmentVariables();
          Configuration = builder.Build();
        }
        /// <summary>
        /// Startup with Configuration
        /// </summary>
        /// <param name="configuration"></param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();
            services.AddApiVersioning(options => options.ReportApiVersions = true);
            services.AddOData().EnableApiVersioning();
            services.AddRazorPages();

            services.AddMvcCore(options =>
            {
              foreach (var outputFormatter in options.OutputFormatters.OfType<ODataOutputFormatter>().Where(_ => _.SupportedMediaTypes.Count == 0))
              {
                outputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
              }
              foreach (var inputFormatter in options.InputFormatters.OfType<ODataInputFormatter>().Where(_ => _.SupportedMediaTypes.Count == 0))
              {
                inputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
              }
              //options.Filters.Add(new ApiValidationActionFilter());
            }).AddApiExplorer();

            services.AddCors(options =>
            {
              options.AddPolicy("CorsPolicy",
                  builder => builder.AllowAnyOrigin()
                      .AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader());
            });

            services.AddSpaStaticFiles(configuration =>
            {
              configuration.RootPath = "wwwroot";
            });
            services.AddControllers().AddNewtonsoftJson();
            services.AddControllersWithViews().AddNewtonsoftJson();
            services.AddRazorPages().AddNewtonsoftJson();
            services.AddControllers(mvcOptions =>
                mvcOptions.EnableEndpointRouting = false);

            //services.AddOData();
            services.AddODataApiExplorer(
                options =>
                {
                  options.GroupNameFormat = "'v'VVV";
                  options.SubstituteApiVersionInUrl = true;
                });
            services.AddMvc()
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ContractResolver =
              new CamelCasePropertyNamesContractResolver());
            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddRouting(r => r.SuppressCheckForUnhandledSecurityMetadata = true);
            services.AddSwaggerGen(

                options =>
                {
                        // resolve the IApiVersionDescriptionProvider service
                        // note: that we have to build a temporary service provider here because one has not been created yet
                        var provider = services.BuildServiceProvider().GetRequiredService<IApiVersionDescriptionProvider>();

                        // add a swagger document for each discovered API version
                        // note: you might choose to skip or document deprecated API versions differently
                        foreach (var description in provider.ApiVersionDescriptions)
                  {
                    options.SwaggerDoc(description.GroupName, CreateInfoForApiVersion(description));
                  }

                        // add a custom operation filter which sets default values
                        //options.OperationFilter<SwaggerDefaultValues>();

                        // integrate xml comments
                        options.IncludeXmlComments(XmlCommentsFilePath);

                        //add file upload for each api
                        //options.OperationFilter<FileUploadOperation>();

                        //only show authentication for protection api
                        //options.OperationFilter<SecurityRequirementsOperationFilter>();

                        options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                  {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey
                  });
                        // Language
                        //options.OperationFilter<LanguageFilter>();

                        options.AddSecurityRequirement(new OpenApiSecurityRequirement()
                    {
                              {
                                  new OpenApiSecurityScheme
                                  {
                                      Reference = new OpenApiReference
                                      {
                                          Type = ReferenceType.SecurityScheme,
                                          Id = "Bearer"
                                      },
                                      Scheme = "oauth2",
                                      Name = "Bearer",
                                      In = ParameterLocation.Header,
                                  },
                                  new List<string>()
                              }
                    });

                }
            );

            services.AddAuthentication(options =>
            {
              options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
              options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(jwtBearerOptions =>
            {
              jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters
              {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ApiConstants.API_KEY)),

                ValidateIssuer = true,
                ValidIssuer = ApiConstants.API_ISSUER,

                ValidateAudience = true,
                ValidAudience = ApiConstants.API_CLIENT,

                ValidateLifetime = true, //validate the expiration and not before values in the token

                ClockSkew = TimeSpan.FromMinutes(5) //5 minute tolerance for the expiration date
              };
              jwtBearerOptions.Events = new JwtBearerEvents
              {
                OnMessageReceived = context =>
                {
                  var accessToken = context.Request.Query["access_token"];

                  // If the request is for our hub...
                  var path = context.HttpContext.Request.Path;
                  if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/isHub")))
                  {
                    // Read the token out of the query string
                    context.Token = accessToken;
                  }
                  return Task.CompletedTask;
                }
              };
            });

            services.AddAuthorization(options =>
            {
              options.AddPolicy("Member",
                  policy => policy.RequireClaim("MembershipId"));
            });

            var settingsSection = Configuration.GetSection("IdentitySettings");
            DataConstants.IdentitySettings = settingsSection.Get<IdentitySettings>();

            //inject dependency
            services.AddTransient<IProductService, ProductService>();
            //register background thread
            services.AddScheduler();
          }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IApiVersionDescriptionProvider provider)
        {
            app.UseHsts();

            app.Use(async (context, next) => {
              await next();
              if (context.Response.StatusCode == 404 &&
              !Path.HasExtension(context.Request.Path.Value) &&
              !context.Request.Path.Value.StartsWith("/api/"))
              {
                context.Request.Path = "/index.html";
                context.Response.StatusCode = 200;
                await next();
              }
            });
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
            app.Use((context, next) =>
            {
              context.Items["__CorsMiddlewareInvoked"] = true;
              return next();
            });

            app.UseDeveloperExceptionPage();
            app.UseRouting();

            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
              endpoints.MapRazorPages();
              endpoints.MapControllers();
            });

            app.UseSwagger(c =>
            {
              c.SerializeAsV2 = true;
            });
            app.UseSwaggerUI(c =>
            {
              foreach (var description in provider.ApiVersionDescriptions)
              {
                c.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
              }
              //c.SwaggerEndpoint("/swagger/v1/swagger.json", "ForSignAPIClient v1");
            });

            app.UseSpa(spa =>
            {
              spa.Options.SourcePath = "ClientApp";

              if (env.IsDevelopment())
              {
                spa.Options.StartupTimeout = new TimeSpan(0, 0, 80);
                spa.UseAngularCliServer(npmScript: "start");
              }
            });
        }

        static OpenApiInfo CreateInfoForApiVersion(ApiVersionDescription description)
        {
            var info = new OpenApiInfo()
            {
              Title = $"IFashion API {description.ApiVersion}",
              Version = description.ApiVersion.ToString(),
              Description = "IFashion API with Swagger, Swashbuckle, and API versioning.",
              Contact = new OpenApiContact() { Name = "Hao Nguyen", Email = "nhenden1511@gmail.com" },
              //TermsOfService = "This is internal api",
              //License = new OpenApiLicense() { Name = "Release Notes", Url = new Uri("https://docs.google.com/document/d/1AG_ly8nx4DSPXXqtA8eTBJtK9MMU_Xk-PSC6zEzELjs/edit?usp=sharing") }
            };

            if (description.IsDeprecated)
            {
              info.Description += " This API version has been deprecated.";
            }

            return info;
        }
        static string XmlCommentsFilePath
        {
            get
            {
              var basePath = PlatformServices.Default.Application.ApplicationBasePath;
              var fileName = typeof(Startup).GetTypeInfo().Assembly.GetName().Name + ".xml";
              return Path.Combine(basePath, fileName);
            }
        }
    }
}
