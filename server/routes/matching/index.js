const router = require('express').Router()
const controller = require('./controller')
const upload = require('../../middleware/uploadAfterImage')

/*
    [ 1. POST Methods ]
    POST /api/proposal/register         : 제안서 등록 API
    POST /api/proposal/registerWithFile : 제안서 등록 API with Image File
    
    [ 2. GET Methods ]
    GET /api/proposal/list          : 전체 제안서 목록 조회 API
    GET /api/proposal/:id           : 제안서 정보 조회 API
    GET /api/proposal/user/:userId  : 유저 ID로 제안서 정보 조회 API

    [ 3. PATCH Methods ]
    PATCH /api/proposal/:id           : 제안서 정보 수정 API
    PATCH /api/proposal/matching/:id  : 제안서 매칭여부 수정 API

    [ 4. DELETE Methods]
    DELETE /api/proposal/:id : 제안서 정보 삭제 API
*/

router.post('/register', controller.registerMatching)

router.get('/list', controller.getMatchingList)
router.get('/designer/:id', controller.getMatchingListByDesignerId)
router.get('/customer/:id', controller.getMatchingListByCustomerId)
router.get('/:id', controller.getMatching)

// router.patch('/:id', controller.patchMatching)
// router.patch('/matching/:id', controller.patchMatchingStatus)

router.delete('/:id', controller.deleteMatching)

module.exports = router
