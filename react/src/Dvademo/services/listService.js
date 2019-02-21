import request from '../utils/request';

export function fetchList() {
    return request('/data.json');
}

export function removeListItem() {
    return true;
}