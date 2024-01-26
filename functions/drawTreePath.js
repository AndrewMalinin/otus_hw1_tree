const drawTreePath = (treePath, objName, isLastObj, objIcon) => {
   let resultString = treePath.reduce((acc, treePathObj) => {
      if (treePathObj.isLast) {
         return acc + '   ';
      } else {
         return acc + '|  ';
      }
   }, '');
   console.log(resultString + (isLastObj ? '└──' : '├──') + objIcon + ' ' + objName);
};

module.exports = {
   drawTreePath
}
