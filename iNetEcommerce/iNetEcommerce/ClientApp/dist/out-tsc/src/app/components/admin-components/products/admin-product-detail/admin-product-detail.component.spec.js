import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { AdminProductDetailComponent } from './admin-product-detail.component';
describe('AdminProductDetailComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [AdminProductDetailComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AdminProductDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=admin-product-detail.component.spec.js.map