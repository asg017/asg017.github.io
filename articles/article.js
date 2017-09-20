$(document).ready( function() {
  
  d3.csv('all.csv', function(err,data) {
    
    data.forEach(function(d) {
      d.Total = +d.Total;
    })
    window.dataset = data;
    dataset = data;
    
    $('.ui.accordion').accordion({
      onChange: function() {
  
      },
      
    });
      
    var winHeight = window.innerHeight;
    
    var genderInterval;
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~    DATA     FILTERING    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      function rollupGender(v) {
        var mCount = d3.sum(v, function(d) { return d['Total-M']});
        var fCount = d3.sum(v, function(d) { return d['Total-F']});
        var total = d3.sum(v, function(d) { return d.Total;});
        
        var mRatio = (mCount + fCount) ? mCount / (mCount + fCount) : 0;
        var fRatio = (mCount + fCount) ? fCount / (mCount + fCount) : 0;
        
        return {
          mCount: mCount,
          fCount: fCount,
          mRatio: mRatio,
          fRatio: fRatio,
          total: total
        }
      }
      function sortNestQuarter(a,b) {
        var yearA = Number(a.key.substring(2,4));
        var yearB = Number(b.key.substring(2,4));
        var quarterWeights = {'wi':1,'sp':2,'fa':3};
        
        var aVal = (yearA * 10) + quarterWeights[ a.key.substring(0,2) ];
        var bVal = (yearB * 10) + quarterWeights[ b.key.substring(0,2) ];
        return aVal - bVal;
      }
      
      function sizeByQuarter(data) {
        return d3.nest()
        .key( function(d) { return d.Quarter;})
        .rollup(rollupGender)
        .entries(data)
        .sort(sortNestQuarter)
      }
      

    // ~~~~~~~~~~~~~~~~~~~~~~~~~    SCROLL   FUNCS    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
    var scrollFuncs = {
      dataDescrip: {
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
      },
      
      academicIdent: {
        intro: {
          focus: function(e,item) {
            
          },
          
          blur: function(e,item) {
            
          }
        },
  
        year: {
          focus: function(e,item) {
            var t = d3.transition().duration(1000);
            
            d3.selectAll('.academicIdent-annotation')
              .transition(t.duration(200))
              .style('opacity',0.3)
              
            var yearAnnot = d3.select('.annot-year')
            
            yearAnnot
              .transition(t)
              .style('opacity', 1)
            
            yearAnnot.selectAll('text')
              .transition(t)
                .attr('fill', '#EB2E6C')
                
            yearAnnot.selectAll('path')
              .transition(t)
                .attr('stroke', '#EB2E6C')
          },
          
          blur: function(e,item) {
            var t = d3.transition().duration(250);
            var yearAnnot = d3.select('.annot-year')
            
            yearAnnot
              .transition(t)
              .style('opacity', 0.3)
          }
        },
        
        gender: {
          focus: function(e,item) {
            
            d3.select('#student-svg')
  	            .transition(d3.transition().duration(1500))
  	            .attr('fill', '#4286f4')
  	            
            genderInterval = setInterval(function() {
              d3.select('#student-svg')
  	            .transition(d3.transition().duration(750))
  	            .attr('fill', '#ff14d0')
                .transition(d3.transition().duration(750))
  	            .attr('fill', '#4286f4')
  
            }, 1500);
            var t = d3.transition().duration(1000);
            
            
            
            d3.selectAll('.academicIdent-annotation')
              .transition(t.duration(200))
              .style('opacity',0.3)
              
            var genderAnnot = d3.select('.annot-gender')
            
            genderAnnot
              .transition(t)
              .style('opacity', 1)
            
            genderAnnot.selectAll('text')
              .transition(t)
                .attr('fill', '#EB2E6C')
                
            genderAnnot.selectAll('path')
              .transition(t)
                .attr('stroke', '#EB2E6C')
          },
          
          blur: function(e,item) {
            var t = d3.transition().duration(250);
            var genderAnnot = d3.select('.annot-gender')
            
            genderAnnot
              .transition(t)
              .style('opacity', 0.3)
            
            clearInterval(genderInterval);
            d3.select('#student-svg')
                .transition(d3.transition().duration(100))
  	            .attr('fill', '#000')
          }
        },
        
        college: {
          focus: function(e,item) {
            var t = d3.transition().duration(1000);
            
            d3.selectAll('.academicIdent-annotation')
              .transition(t.duration(200))
              .style('opacity',0.3)
              
            var collegeAnnot = d3.select('.annot-college')
            
            collegeAnnot
              .transition(t)
              .style('opacity', 1)
            
            collegeAnnot.selectAll('text')
              .transition(t)
                .attr('fill', '#EB2E6C')
                
            collegeAnnot.selectAll('path')
              .transition(t)
                .attr('stroke', '#EB2E6C')
          },
          
          blur: function(e,item) {
            var t = d3.transition().duration(250);
            var collegeAnnot = d3.select('.annot-college')
            
            collegeAnnot
              .transition(t)
              .style('opacity', 0.3)
          }
        },
        
        depart: {
          focus: function(e,item) {
            var t = d3.transition().duration(1000);
            
            d3.selectAll('.academicIdent-annotation')
              .transition(t.duration(200))
              .style('opacity',0.3)
              
            var departAnnot = d3.select('.annot-department')
            
            departAnnot
              .transition(t)
              .style('opacity', 1)
            
            departAnnot.selectAll('text')
              .transition(t)
                .attr('fill', '#EB2E6C')
                
            departAnnot.selectAll('path')
              .transition(t)
                .attr('stroke', '#EB2E6C')
          },
          
          blur: function(e,item) {
            var t = d3.transition().duration(250);
            var departAnnot = d3.select('.annot-department')
            
            departAnnot
              .transition(t)
              .style('opacity', 0.3)
          }
        },
      },
      
      ucsdGeneral: {
        intro: {
          
          focus: function(e,item) {
          
          }
        },
        
        size: {
          
          focus: function(e,item) {
          
          }
        },
        
        sizefall: {
          
          focus: function(e,item) {
          
          }
        },
        
        growpercent: {
          
          focus: function(e,item) {
          
          }
        },
        
        dropoff: {
          
          focus: function(e,item) {
          
          }
        },
        
        gender1: {
          
          focus: function(e,item) {
          
          }
        },
        
        gender2: {
          
          focus: function(e,item) {
          
          }
        },
      },
      
      ucsdCollege: {
        intro: {
          
          focus: function(e,item) {
          
          }
        },
      },
    };
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~    HANDLE   BLUR/FOCUS    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
    var handleFocus = {
      dataDescrip:   function (e, item) {
        var id = item.id;
        scrollFuncs['dataDescrip'][id.split('-')[2]].focus.call(e,item);
      },
      
      academicIdent: function(e,item) {
        var id = item.id;
        scrollFuncs['academicIdent'][id.split('-')[2]].focus.call(e,item);
      },
      
      ucsdGeneral: function(e,item) {
        var id = item.id;
        scrollFuncs['ucsdGeneral'][id.split('-')[2]].focus.call(e,item);
      },
      
      ucsdCollege: function(e,item) {
        var id = item.id;
        scrollFuncs['ucsdCollege'][id.split('-')[2]].focus.call(e,item);
      },
      
    };
    var handleBlur = {
      dataDescrip : function (e, item) {
        var id = item.id;
        if(scrollFuncs['dataDescrip'][id.split('-')[2]].blur) {
          scrollFuncs['dataDescrip'][id.split('-')[2]].blur.call(e,item);
        }
      },
      academicIdent : function (e, item) {
        var id = item.id;
        if(scrollFuncs['academicIdent'][id.split('-')[2]].blur) {
          scrollFuncs['academicIdent'][id.split('-')[2]].blur.call(e,item);
        }
      },
      ucsdGeneral : function (e, item) {
        var id = item.id;
        if(scrollFuncs['ucsdGeneral'][id.split('-')[2]].blur) {
          scrollFuncs['ucsdGeneral'][id.split('-')[2]].blur.call(e,item);
        }
      },
      ucsdColleges : function (e, item) {
        var id = item.id;
        if(scrollFuncs['ucsdColleges'][id.split('-')[2]].blur) {
          scrollFuncs['ucsdColleges'][id.split('-')[2]].blur.call(e,item);
        }
      },
      
    };
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~    SCROLL   STORIES    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    function handleScroll(svgId) {
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
    
    var scrollStories = {};
    
    scrollStories['dataDescrip'] = $('#data-descrip-scroll-container').scrollStory({
      contentSelector: '.step',
      triggerOffset: winHeight / 2,
      itemfocus: handleFocus['dataDescrip'],
      itemblur: handleBlur['dataDescrip'],
      containerscroll: (handleScroll('#svg-data-descrip')),
    
    });
    
    scrollStories['academicIdent']  = $('#academic-ident-scroll-container').scrollStory({
      contentSelector: '.step',
      triggerOffset: winHeight / 2,
      itemfocus: handleFocus['academicIdent'],
      itemblur: handleBlur['academicIdent'],
      containerscroll: (handleScroll('#svg-academic-ident')),
    
    });
    
    scrollStories['ucsdGeneral']  = $('#ucsd-general-scroll-container').scrollStory({
      contentSelector: '.step',
      triggerOffset: winHeight / 2,
      itemfocus: handleFocus['ucsdGeneral'],
      itemblur: handleBlur['ucsdGeneral'],
      containerscroll: (handleScroll('#svg-ucsd-general')),
    
    });
    
    scrollStories['svg-ucsd-colleges'] = $('#ucsd-colleges-scroll-container').scrollStory({
      contentSelector: '.step',
      triggerOffset: winHeight/2,
      itemfocus: handleFocus['ucsdCollege'],
      itemblur: handleBlur['ucsdCollege'],
      containerscroll: (handleScroll('#svg-ucsd-colleges')),
    });
    window.scrollStories = scrollStories;
    
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~    UCSD   GENERAL    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    var margin = {
      top: 5,
      bottom: 35,
      left:20,
      right:5
    };
    
    var ucsdGenSvgHeight = winHeight * .8;
    var ucsdGenSvgWidth = $('#svg-ucsd-general').width();
    var ucsdGeneralSvg = d3.select('#svg-ucsd-general').append('svg')
      .attr('width',  ucsdGenSvgWidth)
      .attr('height', ucsdGenSvgHeight)
    
    var sizeData = sizeByQuarter(dataset); //[ {key:'fa12', value:{total:30000, mCount/mRatio } ]
    
    var genSizeX = d3.scaleBand().range([0, ucsdGenSvgWidth - margin.left - margin.right ]);
    var genSizeY = d3.scaleLinear().range([ucsdGenSvgHeight - margin.top - margin.bottom, 0]);

    genSizeX.domain(sizeData.map(function(d) { return d.key; }));
    genSizeY.domain([18000, d3.max(sizeData, function(d) { return d.value.total; })]);
    
    var line = d3.line()
      .x(function(d) { return genSizeX(d.key); })
      .y(function(d) { return genSizeY(d.value.total); })
      
    // ============= ucsd-general-size ============================================
    var ucsdGeneralSizeG = ucsdGeneralSvg.append('g')
      .attr('id', 'ucsd-general-size-container')
      .attr('transform', translate(margin.left, margin.top))
    
    
    
    //Add X axis
    var ucsdGenXAxis = d3.axisBottom(genSizeX).tickFormat(function(d) { return d.toUpperCase();});
    
    ucsdGeneralSizeG.append('g')
      .attr('class', 'general-xaxis')
      .call( ucsdGenXAxis )
      .attr('transform', translate(0, ucsdGenSvgHeight-margin.bottom))
    d3.selectAll('.general-xaxis').selectAll('.tick').select('text')
      .attr('transform', 'rotate(-90) ')//translate(-20, -13)')
    
    //Add Y axis
    ucsdGeneralSizeG.append('g')
      .attr('class', 'general-yaxis')
      .call(d3.axisLeft(genSizeY).tickFormat(d3.format('.2s')))
      .attr('transform', translate(margin.left, margin.top))
    
    
    // Annotations, FA07->FA15
    var fallDiffAnnotations = d3.annotation()
      .type(d3.annotationCalloutCircle)
      .annotations([
              {
                note: {
                  label: d3.format(',')(sizeData[1].value.total),
                  title: sizeData[1].key
                },
                x: genSizeX(sizeData[1].key) + margin.left,
                y: genSizeY(sizeData[1].value.total) + margin.top,
                dx: 55,
                dy: -100,
                subject: {
                  radius: 10,
                  radiusPadding: 2,
                }
              },
              {
                note: {
                  label: d3.format(',')(sizeData[25].value.total),
                  title: sizeData[25].key
                },
                x: genSizeX(sizeData[25].key) + margin.left,
                y: genSizeY(sizeData[25].value.total) + margin.top,
                dx: -100,
                dy: 25,
                subject: {
                  radius: 10,
                  radiusPadding: 2,
                }
              }
            ]);
          
    
    scrollFuncs['ucsdGeneral']['size']['focus'] = function(e,item) {
      
      window.line = line;
      
      //Add the graph
      ucsdGeneralSizeG.append('path')
        .attr('id', 'ucsd-general-path-line')
        .attr('transform', translate(margin.left, margin.top))
        .data([sizeData])
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', '#C3A')
        
        //Slowly reveal the line graph
      ucsdGeneralSizeG.append('rect')
        .attr('class', 'curtain-reveal')
        .attr('fill', '#FFF')
        .attr('x', margin.left)
        .attr('y', margin.top)
        .attr('width', ucsdGenSvgWidth - margin.left-margin.right)
        .attr('height', ucsdGenSvgHeight - margin.top - margin.bottom)
        .transition(d3.transition().duration(3000))
          .attr('x', ucsdGenSvgWidth - margin.left-margin.right)
          .on('end', function(){
            
            //Attach the annotations
            ucsdGeneralSizeG.append('g')
              .attr('id', 'ucsd-general-size-annotation')
              .style('opacity', 0)
              .call(fallDiffAnnotations)
              .transition(d3.transition().duration(1000))
                .style('opacity', 1)

          })
    }
    scrollFuncs['ucsdGeneral']['size']['blur'] = function(e,item) {
      d3.select('#ucsd-general-size-annotation')
        .transition(1500)//
        .style('opacity', 0)
    }
    
    scrollFuncs['ucsdGeneral']['sizefall']['focus'] = function(e,item) {
      var fallFiltered = sizeData.filter(function(d) { return d.key.substring(0,2) === 'fa'; });
      
      genSizeX.domain(fallFiltered.map(function(d) { return d.key; }));
      genSizeX.range([0, ucsdGenSvgWidth - margin.left - margin.right ])
      
      line = d3.line()
        .x(function(d) { return genSizeX(d.key); })
        .y(function(d) { return genSizeY(d.value.total); });
      
      //ucsdGeneralSizeG.select('path')
      d3.select('#ucsd-general-path-line')
        .attr('transform', translate(margin.left, margin.top))
        .data([fallFiltered])
        .transition(d3.transition().duration(1500))
        .attr('d', line)
      d3.select('.general-xaxis')
        .call(d3.axisBottom(genSizeX))
    }
    
    scrollFuncs['ucsdGeneral']['gender1']['focus'] = function(e,item) {
     d3.select('#ucsd-general-size-container')
      .transition(750)
      
      .style('opacity', 0)
    }
      
      
    // ~~~~~~~~~~~~~~~~~~~~~~~~~    UCSD   COLLEGES    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    d3.select('#svg-ucsd-colleges').append('svg')
  
    // ~~~~~~~~~~~~~~~~~~~~~~~~~    ACADEMIC   IDENT    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
    var academicIdentSvg = d3.select('#svg-academic-ident').select('svg');
    
    var academicIdentWidth = $('#svg-academic-ident').width();
    
    academicIdentSvg
      .attr('width',  academicIdentWidth)
      .attr('height', winHeight/2)
    
    
    var studentG = academicIdentSvg.select('#student-svg');
    
  
    studentG
      .attr('transform', studentG.attr('transform') + ' ' +
            translate( (academicIdentWidth/2 - 114/2)*(1/.3) , (winHeight/4-135/2)*(1/.3) ) )
    
    var academicIdentAnnotations = [
      {
        className: 'academicIdent-annotation annot-gender',
        note: {title:'Gender', align:'left'},
        x: academicIdentWidth/2 - 50,
        y: winHeight/4 - 50,
        dx: -100,
        dy: -30,
      },
      {
        className: 'academicIdent-annotation annot-year',
        note: {title:'Year', align:'right'},
        x: academicIdentWidth/2 + 65,
        y: winHeight/4 - 50,
        dx: 100,
        dy: -30,
      },
      {
        className: 'academicIdent-annotation annot-college',
        note: {title:'College',align:'left'},
        x: academicIdentWidth/2 -50,
        y: winHeight/4 + 75,
        dx: -100,
        dy: 30,
      },
      {
        className: 'academicIdent-annotation annot-department',
        note: {title:'Dept/Major',align:'right'},
        id: 'woooo',
        x: academicIdentWidth/2 + 65,
        y: winHeight/4 + 75,
        dx: 100,
        dy: 30,
        lineType: 'horizontal'
        
      },
        
    ];
    
    var academicIdentAnnotate = d3.annotation()
  	.type(d3.annotationCalloutElbow)
  	//.editMode(true)
  	.annotations(academicIdentAnnotations);
  	
  	academicIdentSvg.append('g').call(academicIdentAnnotate)
  	
  	
  	
    // ~~~~~~~~~~~~~~~~~~~~~~~~~    DATA   DESCRIPTION    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
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
});