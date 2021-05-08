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