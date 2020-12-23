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

export const getHomePageResourth = ({ commit }) => {
	return Svc.getHomePageResourth().then((resp) => {
		return resp;
	});
};

export const getRecommList = ({ commit }) => {
	return Svc.getRecommList().then((resp) => {
        console.log(resp.data.data)
		if (resp.data.code === 200) {
			commit("setRecommList", resp.data.data);
		} else {
		}
		return resp.data.data;
	});
};

export const getHomePageTypeList = ({ commit }) => {
	return Svc.getTypelist().then((resp) => {
		if (resp.data.code === 200) {
			commit("setTypeList", resp.data.data);
		} else {
		}
		return resp.data.data;
	});
};

export const getTypeDetailsActions = ({commit}, type) => {
    return Svc.getTypeDetails(type).then((resp) => {
        console.log(resp)
		return resp.data.data;
    })
}