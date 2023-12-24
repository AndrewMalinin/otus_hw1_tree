const {OBJECT_ICON} = require('../constants/objectsIcon');

function drawRootDir(path) {
   console.log(OBJECT_ICON.FOLDER + ' ' + path);
}

module.exports = {
   drawRootDir,
};
