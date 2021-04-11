import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
describe('ProductDetailComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [ProductDetailComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ProductDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=product-detail.component.spec.js.map