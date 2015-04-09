// REPLACING AN ITEM IN AN ARRAY


// plain js
 
var item = $scope.timeline.filter(function (item) {
  return item._id === message._id
})[0]
 
// ramda
 
var R = require('ramda')
 
var item = R.find(R.propEq('_id', message._id))($scope.timeline)
 
// replacing an item with plain js
 
var newTimeline = $scope.timeline.map(function (item) {
  if (item._id === message._id) return data.msg
  return item
})
 
// with ramda
 
var replaceItem = function(item) {
  if (R.propEq('_id', message._id)(item)) return data.msg
  return item
}
var newTimeline = R.map(replaceItem)($scope.timeline)
 
// better
 
var replaceItem = R.curry(function (replaceBy, replaceWith, item) {
  if (replaceBy(item)) return replaceWith
  return item
})
var handleReplace = replaceItem(R.propEq('_id', message._id), data.msg)
var newTimeline = R.map(handleReplace)($scope.timeline)
 
 