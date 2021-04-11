import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { HomeAdminComponent } from './home-admin.component';
describe('HomeAdminComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [HomeAdminComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(HomeAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=home-admin.component.spec.js.map