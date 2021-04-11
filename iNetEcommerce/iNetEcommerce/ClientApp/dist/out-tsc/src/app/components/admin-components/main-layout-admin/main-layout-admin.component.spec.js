import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { MainLayoutAdminComponent } from './main-layout-admin.component';
describe('MainLayoutAdminComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [MainLayoutAdminComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(MainLayoutAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=main-layout-admin.component.spec.js.map