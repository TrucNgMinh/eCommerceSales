using System;

namespace iNet.Entities
{
	  public abstract class Entity : IDisposable
	  {
        public bool IsDeactivate { get; set; }

        public bool IsDeleted { get; set; }

        public DateTimeOffset? DateTimeProcessed { get; set; }

        bool disposed = false;

        protected Entity()
        {
        }

        public void Dispose()
        {
          Dispose(true);
          GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
          if (disposed)
            return;

          if (disposing)
          {
            // Free any other managed objects here. 
          }

          // Free any unmanaged objects here. 
          disposed = true;
        }
    }
}

