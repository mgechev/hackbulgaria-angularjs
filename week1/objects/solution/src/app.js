/* global Video: false, document: false, BWFilter: false */

var vid = new Video(document.getElementById('video'),
      document.getElementById('canvas'));
vid.addFilter(new BWFilter());
vid.start();
