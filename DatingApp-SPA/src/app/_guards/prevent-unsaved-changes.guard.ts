import {Injectable} from '@angular/core';
import {CanDeactivate,} from '@angular/router';

import {MembersEditComponent} from '../members/members-edit/members-edit.component';

@Injectable()
export class PreventUnsavedChanges
  implements CanDeactivate<MembersEditComponent> {
  canDeactivate(component: MembersEditComponent): boolean {
    if (component.form.dirty) {
      return confirm(
        'Are you sure you want to discard unsaved changes?',
      );
    }
    return true;
  }
}
