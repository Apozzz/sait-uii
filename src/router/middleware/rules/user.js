import store from '../../../store';

export default (to, from, next) => {
    if (store.getters['auth/authenticated'] &&
        (
            store.getters['auth/user']['role'] == 'member' ||
            store.getters['auth/user']['role'] == 'admin'
        )) {
        next();
    } else {
        next({ name: 'login' });
    }
}