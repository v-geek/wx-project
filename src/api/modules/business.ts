import request from '..'

// 查询资讯栏目列表
export const findContentColumns = (cityCode: string) =>
  request({
    url: '/third/news/findContentColumns',
    method: 'POST',
    data: {
      cityCode, // 外部应用app城市编码, eg: 成都 510100
      dynamicType: 'COMMUNITY_INFO' // 固定参数
    }
  })

// 查询资讯列表数据
export const findContentList = (data: {
  cityCode: string
  contentColumnId: string
  pageIndex: number
  pageSize: number
}) =>
  request({
    url: '/third/news/findContentList',
    method: 'POST',
    data
  })

// 查询资讯详情
export const getInfoDetails = (id: string) =>
  request({
    url: `/third/news/getInfoDetails/${id}`,
    method: 'POST'
  })

// 增加资讯浏览量
export const addInfoNum = (id: string) =>
  request({
    url: `/third/news/addInfoNum/${id}`,
    method: 'POST'
  })

// 全查询点位列表
export const getPointList = (data: { areaCode: string }) =>
  request({
    // baseUrl: 'http://192.168.0.68:18888',
    url: '/mapBackend/api/map/selectPointList',
    method: 'POST',
    data
  })

// 查询单个点位详情
export const getPointInfo = (id: string) => {
  return request({
    // baseUrl: 'http://192.168.0.68:18888',
    url: '/mapBackend/api/map/selectPointInfo',
    method: 'GET',
    data: {
      id
    }
  })
}

// 通过街道和社区名称返回对应的边界信息
export const getCommunityBorder = (areaCode: string) => {
  return request({
    // baseUrl: 'http://192.168.0.68:18888',
    url: '/mapBackend/api/map/getCommunityBorder',
    method: 'GET',
    data: {
      areaCode
    }
  })
}

// 查询是否展示社区边界权限
export const getDisplayPermissions = (areaCode: string) => {
  return request({
    url: '/mapBackend/api/map/getDisplayPermissions',
    method: 'GET',
    data: {
      areaCode
    }
  })
}

// 获取投票活动分页数据
export const getActivities = (data: { code: string; pageNum: number; pageSize: number }) =>
  request({
    url: '/third/vote/getActivities',
    method: 'POST',
    data
  })

// 查询社区介绍
export const getInfoByCode = (areaCode: string) => {
  return request({
    url: '/third/community/introduce/getInfoByCode',
    method: 'GET',
    data: {
      areaCode
    }
  })
}
