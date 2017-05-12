import updateFunc from '../update/update'
import createFunc from '../create/create'

let runGame = {
  preload: function () {},
  create: function () {createFunc()},
  update: function () {updateFunc()}
}

export default runGame