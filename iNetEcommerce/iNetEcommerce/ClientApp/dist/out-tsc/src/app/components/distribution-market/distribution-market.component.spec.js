import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { DistributionMarketComponent } from './distribution-market.component';
describe('DistributionMarketComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [DistributionMarketComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(DistributionMarketComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=distribution-market.component.spec.js.map