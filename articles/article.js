$(document).ready( function() {
  
  $('.ui.accordion').accordion();
    
  var winHeight = window.innerHeight;
  
  var focusFuncs = {
    dataDescrip: {
      intro:{/*.....*/}
    }
  }
  var descripFocusFuncs = {
    
    intro: {
      focus: function(e,item) {
        console.log('#1');
      },
    },
    
    notsame: {
      focus: function(e,item) {
        console.log('#2')
        
        d3.selectAll('.dataDescriptTile').each( function(data,i,arr) {
          var d3Select = d3.select(this);
          d3Select.attr('fill', '#182B49');
          
          setTimeout(function() {
            d3Select.attr('fill', color(data.type));
            d3Select.attr('stroke', d3.color(color(data.type)).darker() );
          }, i * 33);
      	});
  
      },
    },
    
    section1: {
      focus: function(e,item) {
        d3.selectAll('.dataDescriptTile.type-1')
          .transition( d3.transition().duration(1000))
          .each(function(d,i) {
            $(this).data('oldposition', $(this).attr('transform'))
          })
          .attr('transform', function (d,i) {
            return translate(150, i * 15);
          })
      },
      
      blur: function(e,item) {
        d3.selectAll('.dataDescriptTile.type-1')
          .transition( d3.transition().duration(500))
          .attr('transform', function (d,i) {
            return $(this).data('oldposition');
          })
      }
    },
      
    section2:   {
      focus: function(e,item) {
        d3.selectAll('.dataDescriptTile.type-2')
          .transition( d3.transition().duration(1000))
          .each(function(d,i) {
            $(this).data('oldposition', $(this).attr('transform'))
          })
          .attr('transform', function (d,i) {
            return translate(150, i * 15);
          })
      },
      
      blur: function(e,item) {
        d3.selectAll('.dataDescriptTile.type-2')
          .transition( d3.transition().duration(500))
          .attr('transform', function (d,i) {
            return $(this).data('oldposition');
          })
      }
    },
      
    section3: {
      focus: function(e,item) {
        d3.selectAll('.dataDescriptTile.type-3')
          .transition( d3.transition().duration(1000))
          .each(function(d,i) {
            $(this).data('oldposition', $(this).attr('transform'))
          })
          .attr('transform', function (d,i) {
            return translate(150, winHeight/2 + i * 15);
          })
      },
      
      blur: function(e,item) {
        d3.selectAll('.dataDescriptTile.type-3')
          .transition( d3.transition().duration(500))
          .attr('transform', function (d,i) {
            return $(this).data('oldposition');
          })
      }
    },
    
    section4: {
      focus: function(e,item) {
        d3.selectAll('.dataDescriptTile.type-4')
          .transition( d3.transition().duration(1000))
          .each(function(d,i) {
            $(this).data('oldposition', $(this).attr('transform'))
          })
          .attr('transform', function (d,i) {
            return translate(150, winHeight/2 + i * 15);
          })
      },
      
      blur: function(e,item) {
  
        d3.selectAll('.dataDescriptTile.type-4')
          .transition( d3.transition().duration(200))
          .attr('transform', function (d,i) {
            return $(this).data('oldposition');
          })
      }
    },
    
    conclude: {
      focus: function(e,item) {
        setTimeout(function() {
          var filtered = dataDescrip.filter(function(d){return d.type === 2 || d.type === 3;});
          console.log('filtered', filtered)
          x.domain(filtered.map(function(d) { return d.quarter;}));
          
          var bob = dataDescripG.selectAll('.dataDescriptTile').data(filtered, function(d) { return d.quarter;});
          console.log('bob', bob)
          
          bob.exit()
          .transition(d3.transition().duration(750))
            .style('opacity', 0)
            .each(function(d) {
              console.log('d',d);
          })
          .remove();
          
          bob
            .attr('height', x.bandwidth())
            .attr('width', x.bandwidth())
            .attr('transform', function(d,i) { return translate(containerWidth-x.bandwidth() - 35, i * x.bandwidth() );});
          
          d3.select('#dataDescripXAxis')
            .call(d3.axisRight(x))
                  
        },250)
        
      },
      
      blur: function(e,item) {
        console.log('#7')
         dataDescripG.selectAll('.dataDescriptTile').data(dataDescrip, function(d) { return d.quarter;})
          .enter().append('rect')
          .transition(d3.transition().duration(750))
              
                .attr('height', x.bandwidth() )
                .attr('width', x.bandwidth())
                .attr('class', function(d) { return 'dataDescriptTile type-' + d.type;})
                .attr('fill', function(d) { return color(d.type)})
                .attr('stroke', function(d) { return d3.color(color(d.type)).darker(); })
                .attr('stroke-width', 1)
                .attr('transform', function(d,i) { return 'translate(' + ( containerWidth - x.bandwidth() - 35 ) + ',' + i * x.bandwidth() + ')'})
      
        return;
        $('#svg-data-descrip').removeClass('fixed');
        $('#svg-data-descrip').css('top', '100%');
        $('#svg-data-descrip').css('margin-top', '-' + ($('#svg-data-descrip').height()) + 'px');
      },
    },
    
  };


  var handleFocus = {
    dataDescrip:   function (e, item) {
      var id = item.id;
      descripFocusFuncs[id.split('-')[2]].focus.call(e,item);
    },
    
  };
  var handleBlur = {
    dataDescrip : function (e, item) {
      var id = item.id;
      if(descripFocusFuncs[id.split('-')[2]].blur) {
        descripFocusFuncs[id.split('-')[2]].blur.call(e,item);
      }
    },
    
  };
  
  

  
  function handleScrollGeneric(svgId) {
    return function() {
      var bb = $(svgId)[0].getBoundingClientRect();
      var outer = $(svgId + '-outer')[0].getBoundingClientRect();
      
      var enteringFromTop = !$(svgId).hasClass('bottom') && !$(svgId).hasClass('fixed') && bb.top >= 0 && outer.top <= winHeight/2 - $(svgId).height()/2;
      var exitingFromTop = bb.top <= outer.top;
      
      var exitingFromBottom = bb.bottom >= outer.bottom;
      var enteringFromBottom = $(svgId).hasClass('bottom') && bb.top > 0;
      
      if(enteringFromBottom) {
        $(svgId).addClass('fixed');
        $(svgId).removeClass('bottom');
        $(svgId).css('top', winHeight/2 - $(svgId).height()/2 );
        return;
      }
      
      if(exitingFromTop) {
        $(svgId).removeClass('fixed');
        $(svgId).addClass('top');
        $(svgId).css('top', '');
        return;
      }
      if(exitingFromBottom) {
        $(svgId).removeClass('fixed');
        $(svgId).addClass('bottom');
        $(svgId).css('top', '')
        return;
      }
      if(enteringFromTop) {
        $(svgId).addClass('fixed');
        $(svgId).removeClass('top');
        $(svgId).css('top', winHeight/2 - $(svgId).height()/2 )
        return;
      }
    }
  }
  
  $('#data-descrip-scroll-container').scrollStory({
    contentSelector: '.step',
    triggerOffset: winHeight / 2,
    itemfocus: handleFocus['dataDescrip'],
    itemblur: handleBlur['dataDescrip'],
    containerscroll: (handleScrollGeneric('#svg-data-descrip')),
  
  });
  
    $('#academic-ident-scroll-container').scrollStory({
    contentSelector: '.step',
    triggerOffset: winHeight / 2,
    //itemfocus: handleAcademicIdentFocus,
    //itemblur: handeAcademicIdentBlur,
    //containerscroll: (handleScrollGeneric('#svg-data-descrip')),
  
  });
  /*
  $('#academic-ident-scroll-container').scrollStory({
    contentSelector: '.step',
    triggerOffset: winHeight / 2,
    itemfocus: handleAcademicIdentFocus,
    itemblur: handeAcademicIdentBlur,
    containerscroll: handleAcademicIdentScroll,
  
  });*/
  
  var dataDescrip = [
    {quarter:"fa03",type:1},{quarter:"wi04",type:1},{quarter:"sp04",type:1},
    {quarter:"fa04",type:1},{quarter:"wi05",type:1},{quarter:"sp05",type:1},
    {quarter:"fa05",type:1},{quarter:"wi06",type:1},{quarter:"sp06",type:1},
    {quarter:"fa06",type:1},{quarter:"wi07",type:1},{quarter:"sp07",type:2},
    {quarter:"fa07",type:2},{quarter:"wi08",type:2},{quarter:"sp08",type:2},
    {quarter:"fa08",type:2},{quarter:"wi09",type:2},{quarter:"sp09",type:2},
    {quarter:"fa09",type:2},{quarter:"wi10",type:2},{quarter:"sp10",type:2},
    {quarter:"fa10",type:2},{quarter:"wi11",type:2},{quarter:"sp11",type:2},
    {quarter:"fa11",type:2},{quarter:"wi12",type:2},{quarter:"sp12",type:2},
    {quarter:"fa12",type:2},{quarter:"wi13",type:2},{quarter:"sp13",type:2},
    {quarter:"fa13",type:2},{quarter:"wi14",type:2},{quarter:"sp14",type:2},
    {quarter:"fa14",type:2},{quarter:"wi15",type:2},{quarter:"sp15",type:3},
    {quarter:"fa15",type:3},{quarter:"wi16",type:3},{quarter:"sp16",type:3},
    {quarter:"fa16",type:4},{quarter:"wi17",type:4},{quarter:"sp17",type:4},
  ];
  
  var color = d3.scaleLinear().domain([1,2,3,4]).range(['#182B49','#C69214','#FFCD00','#006A96']);
  
  var containerWidth = $('#svg-data-descrip').width();
  
  x = d3.scaleBand().rangeRound([0, winHeight*3/4]);
  x.domain(dataDescrip.map(function(d) { return d.quarter;}));
  
  var dataDescripSvg = d3.select('#svg-data-descrip').append('svg')
    .attr('height', winHeight*3/4)
    .attr('width', containerWidth)
  
  function translate(x,y) {
    return 'translate(' + x + ',' + y + ')';
  }
  
  var dataDescripG = dataDescripSvg.append('g');
  
  dataDescripG.selectAll('rect').data(dataDescrip, function(d) { return d.quarter;}).enter()
    .append('rect')
      .attr('height', x.bandwidth() )
      .attr('width', x.bandwidth())
      .attr('class', function(d) { return 'dataDescriptTile type-' + d.type;})
      .attr('fill', function(d) { return '#182B49'; color(d.type)})
      .attr('stroke', function(d) { return d3.color('#182B49').darker(); d3.color(color(d.type)).darker(); })
      .attr('stroke-width', 1)
      .attr('transform', function(d,i) { return 'translate(' + ( containerWidth - x.bandwidth() - 35 ) + ',' + i * x.bandwidth() + ')';})
  
  dataDescripG.append('g')
    .call(d3.axisRight(x))
      .attr('id', 'dataDescripXAxis')
      .attr('transform', translate(containerWidth-35,0))


});