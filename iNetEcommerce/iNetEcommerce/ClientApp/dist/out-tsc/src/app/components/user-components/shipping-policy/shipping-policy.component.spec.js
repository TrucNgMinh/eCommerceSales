import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { ShippingPolicyComponent } from './shipping-policy.component';
describe('ShippingPolicyComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [ShippingPolicyComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ShippingPolicyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=shipping-policy.component.spec.js.map