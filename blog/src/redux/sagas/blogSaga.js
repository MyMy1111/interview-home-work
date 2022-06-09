import { call, put, takeEvery} from 'redux-saga/effects'
import * as blogAPI from '../../api/blogAPI'
import * as blogAction from '../actions/blogAction'


function* getBlogs(action){
	try {
		const data = yield call(() => blogAPI.getBlogs(action.payload))
		// console.log(data)
		yield put(blogAction.fetch_success(data))
	} catch (err) {
		yield put(blogAction.fetch_error(err))
	}
}

function* blogsSaga() {
	yield takeEvery('blogs/fetch_request', getBlogs)
}

export default blogsSaga;
