const { Branding, Style, StyleMenu, User } = require('../../models')

exports.updateAllBrandingMainStatus = async (user_id) =>
  await Branding.update(
    {
      raw: true,
      main: 0,
    },
    {
      where: {
        user_id,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating All Branding Status')
      return results
    })
    .catch((err) => {
      console.log('Failed Updating All Branding Status')
      return err
    })

exports.updateBrandingMainStatus = async (id, user_id) =>
  await Branding.update(
    {
      raw: true,
      main: 1,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating Branding Main Status')
      return results
    })
    .catch((err) => {
      console.log('Failed Updating Branding Main Status')
      return err
    })

exports.updateBranding = async ({
  id,
  description,
  shop_name,
  position,
  keywords,
  main,
  title,
  address,
}) =>
  await Branding.update(
    {
      raw: true,
      description,
      shop_name,
      position,
      keywords,
      main,
      title,
      address,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((results) => {
      console.log('Success Updating Branding')
      return results
    })
    .catch((err) => {
      console.log(err)
      console.log('Failed Updating Branding')
      return err
    })

exports.destroyBranding = async (brandingId) =>
  await Branding.destroy({
    where: {
      id: brandingId,
    },
  })
    .then((results) => {
      console.log('Success Destroying Branding')
      return results
    })
    .catch((err) => {
      console.log('Failed Destroying Branding')
      return err
    })

exports.selectAllBranding = async () => {
  const results = await Branding.findAll({
    raw: true,
  })

  return results
}

exports.selectAllBrandingByUserId = async (userId) => {
  const results = await Branding.findAll({
    raw: true,
    where: {
      user_id: userId,
    },
  })

  return results
}

exports.selectBrandingInfo = async (userId) => {
  const results = await Branding.findOne({
    raw: true,
    where: {
      user_id: userId,
    },
    include: [
      {
        model: User,
        attributes: ['name', 'img_src'],
      },
    ],
  })

  return results
}

exports.selectBrandingWithStyle = async (userId) => {
  await Branding.findAll({
    where: {
      user_id: userId,
    },
    include: [
      {
        model: Style,
        as: 'styleMenus',
        through: {
          model: StyleMenu,
        },
        required: false,
      },
      {
        model: User,
        attributes: ['name', 'img_src'],
      },
    ],
    order: [['main', 'DESC']],
  })
    .then((results) => {
      console.log('Success Selecting All Branding With Style')
      return results
    })
    .catch((err) => {
      console.log('Failed Selecting All Branding With Style')
      return err
    })
}

exports.insertBranding = async ({
  user_id,
  description,
  shop_name,
  keywords,
  main,
  title,
  position,
  address,
  authentication,
}) =>
  await Branding.create({
    raw: true,
    userId: user_id,
    description,
    shop_name,
    position,
    keywords,
    main,
    title,
    address,
    authentication,
  })
    .then((results) => {
      console.log('Success Creating Branding')
      return results
    })
    .catch((err) => {
      console.log('Failed Creating Branding')
      return err
    })

exports.insertBrandingStyle = async (brandingId, styleId) =>
  await StyleMenu.create({
    raw: true,
    brandingId,
    styleId,
  })
    .then((results) => {
      console.log('Success Creating StyleMenu')
      return results
    })
    .catch((err) => {
      console.log('Failed Creating StyleMenu')
      return err
    })
