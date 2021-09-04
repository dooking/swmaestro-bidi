import { API, formAPI } from './common';

/*
    [ 1. POST Methods ]
    POST /api/style/register : 스타일 등록 API
    
    [ 2. GET Methods ]
    GET /api/style/list          : 전체 스타일 목록 조회 API
    GET /api/style/user/:id      : 유저 ID로 스타일 목록 조회 API
    GET /api/style/:id           : 스타일 정보 조회 API

    [ 3. PATCH Methods ]
    PATCH /api/style/:id           : 스타일 정보 수정 API
    PATCH /api/style/enable/:id    : 스타일 Ai 가능여부 수정 API

    [ 4. DELETE Methods]
    DELETE /api/style/:id : 스타일 정보 삭제 API
*/

const StyleAPI = {
  registerStyle: async (body) => {
    return await formAPI('/style/register', 'post', JSON.stringify(body));
  },
  getStyleList: async (body) => {},
  getStyleListByUserId: async () => {},
  getStyle: async (body) => {},
  patchStyle: async (body) => {},
  patchAiEnable: async (body) => {},
  deleteStyle: async (body) => {},
};
export default StyleAPI;
