import * as Svc from "./service";

export const getBanner = ({ commit }) => {
	return Svc.getBanner().then((resp) => {
		if (resp.data.code === 200) {
			commit("setBannerList", resp.data.data);
		} else {
		}
		return resp.data.data;
	});
};

export const getTypeDetailsActions = ({ commit }) => {
    return Svc.getTypeDetails().then((resp) => {
		if (resp.data.code === 200) {
			commit("setTypeList", resp.data.data);
		} else {
		}
		return resp.data.data;
	});
}

export const getRecommList = ({ commit }) => {
    return Svc.getRecommList().then((resp) => {
        console.log(resp.data)
        commit('setRecommList', resp.data.subjects)
        return resp.data.data
    })
}
export const getTVRecommList = ({ commit }) => {
    return Svc.getTVRecommList().then((resp) => {
        console.log(resp.data)
        commit('setTeleplayList', resp.data.subjects)
        return resp.data.data
    })
}

