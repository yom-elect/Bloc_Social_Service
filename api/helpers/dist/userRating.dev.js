"use strict";

/* eslint-disable linebreak-style */

/* eslint-disable indent */
var POINTS = {
  RANK1: 500,
  RANK2: 1000,
  RANK3: 2000,
  RANK4: 3500,
  RANK5: 5000
};

var calculateUserPoint = function calculateUserPoint(obj) {
  var data = JSON.parse(obj);
  var rankPoint = 0;
  var currentRank = 0;
  rankPoint = parseInt(data.friendsCount, 10) * 1 + parseInt(data.viewsCount, 10) * 0.1 + parseInt(data.mediasCount, 10) * 0.6 + parseInt(data.commentsCount, 10) * 0.4 + parseInt(data.commentsInteraction, 10) * 0.4 + parseInt(data.viewsInteraction, 10) * 0.1;
  if (rankPoint <= POINTS.RANK1) currentRank = 1;
  if (rankPoint >= POINTS.RANK2) currentRank = 2;
  if (rankPoint >= POINTS.RANK3) currentRank = 3;
  if (rankPoint >= POINTS.RANK4) currentRank = 4;
  if (rankPoint >= POINTS.RANK5) currentRank = 5;
  return {
    totalPoint: Math.floor(rankPoint),
    currentRank: currentRank
  };
};

module.exports = {
  calculateUserPoint: calculateUserPoint
};