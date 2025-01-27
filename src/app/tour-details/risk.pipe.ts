import { Pipe, PipeTransform } from '@angular/core';
import { RiskLevel } from '../tour-catalog/tour-preview/tour-data/risk-level.model';

@Pipe({
  name: 'risk',
})
export class RsikPipe implements PipeTransform {
  transform(value: RiskLevel | null): string {
    if (value == null) {
      return 'unknown'
    }
    if (value == RiskLevel.VERY_SAFE) {
      return 'very safe'
    }
    else if (value == RiskLevel.SAFE) {
      return 'safe'
    }
    else if (value == RiskLevel.MODERATE_RISK) {
      return 'moderate risk'
    }
    else if (value == RiskLevel.HIGH_RISK) {
      return 'high risk'
    }
    else if (value == RiskLevel.DANGEROUS) {
      return 'dangerous'
    }
    return 'unknown'

  }
}