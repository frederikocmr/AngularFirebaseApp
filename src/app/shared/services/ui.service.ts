import { Subject } from 'rxjs/Subject';

export class UIService {
    loadingStateChanged = new Subject<boolean>();
    errorMsgStateChanged = new Subject<any>();
}
