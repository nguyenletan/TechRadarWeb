'use strict';
window.isHover = false;


angular.module('techRadarApp').directive('radarDiagram', [
  '$log', 'radarService',
  function ($log, radarService) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/views/radar.html',
      replace: true,
      link: function (scope, element, attrs) {

        function renderChart() {

          d3.select("svg") /*.transition().duration(500)*/.remove();
          var numCategories = 4 /*radarService.categories.length*/,
            equalPortions = [];

          _(numCategories).times(function () {
            equalPortions.push(100 / numCategories);
          });

          var colorPattern = scope.colorPattern = [
            ["#246020", "#5b000a", "#d91500", "#006485"],
            ["#458540", "#80031e", "#eb4a0a", "#0089a5"],
            ["#86b782", "#b32059", "#f38a3e", "#1ebccd"]
          ]; //['#5bc0eb', '#fa7921', '#9bc53d', '#e55934', '#fde74c']

          var width = attrs.width,
            height = attrs.height,
            padding = 0,
            diagramRadius = Math.min(attrs.width, attrs.height) / 2 - padding;

          var pie = d3.pie().sort(null);

          var categoryPie = pie(equalPortions);
          //debugger;
          var categoryArcs = {
            "Tools": categoryPie[0],
            "Techniques & Languages": categoryPie[1],
            "Platforms": categoryPie[2],
            "Frameworks & Libraries": categoryPie[3]
          };
          var pieNumber = 3;

          if (scope.groupActive === "Tools") {
            pieNumber = 0;
          } else if (scope.groupActive === "Techniques & Languages") {
            pieNumber = 1;
          } else if (scope.groupActive === "Platforms") {
            pieNumber = 2;
          } else if (scope.groupActive === "Frameworks & Libraries") {
            pieNumber = 3;
          }

          var renderCategoryArcIndex = 0;

          var arc = d3.arc().innerRadius(10)
            .outerRadius(0)
            .startAngle(0)
            .endAngle(Math.PI * 2);
          //arc();
          var arcSize = 555;
          var pieWidth, pieHeight;
          switch (pieNumber) {
            case 0:
              pieWidth = padding;
              pieHeight = arcSize + padding;
              break;
            case 1:
              pieWidth = padding;
              pieHeight = padding;
              break;
            case 2:
              pieWidth = arcSize + padding;
              pieHeight = padding;
              break;
            case 3:
              pieWidth = arcSize + padding;
              pieHeight = arcSize + padding;
              break;
            default:
              pieWidth = width / 2 - padding;
              pieHeight = height / 2 - padding;
              break;
          }

          var svg = d3.select(element[0]).append("svg")
            .attr("width", width)
            .attr("height", height);

          var svgArcs = svg.append("g")
            //.attr("transform", "translate(" + (width / 2 - padding) + "," + ( padding) + ")");
            .attr("transform", "translate(" + pieWidth + "," + pieHeight + ")");
          var svgNodes = svg.append("g")
            .attr("transform", "translate(" + pieWidth + "," + pieHeight + ")");

          /**
           *  radiusSoftener should be close to 1
           */
          function isOverlappingAnotherPoint(o) {
            function distance(a, b) {
              return Math.sqrt(Math.pow(Math.abs(a.x - b.x), 2) + Math.pow(Math.abs(a.y - b.y), 2));
            }

            /* If two nodes are within a box of xThreshold-by-yThreshold dimensions, reject this placement */
            /* This should scale with the diagramRadius */
            var xThreshold = .15 * diagramRadius; //.15
            var yThreshold = .1 * diagramRadius; //.045

            var foundOne = false;
            _.each(radarService.radar.getTechnologies(),
              function (p) {
                if (o !== p && o.x && o.y && p.x && p.y) {
                  if (Math.abs(o.x - p.x) < xThreshold && Math.abs(o.y - p.y) < yThreshold) {
                    //distance(o, p) < threshold) {
                    foundOne = true;
                  }
                }
              });
            return foundOne;
          }

          var defaultTechRadius = 10;
          var defaultTechSize = 18;
          var hoverTechRadius = 0;
          var radialBuffer = 10;

          function applyRandomXY(arc, d) {
            inner = arc.innerRadius + radialBuffer;
            outer = arc.outerRadius - radialBuffer;
            var r = (Math.random() * (outer - inner)) + inner;

            var angularBuffer = Math.atan(radialBuffer / r);

            var inner = arc.startAngle + angularBuffer;
            var outer = arc.endAngle - angularBuffer;
            var theta = (Math.random() * (outer - inner)) + inner;

            d.x = r * Math.cos(theta - (Math.PI / 2));
            d.y = r * Math.sin(theta - (Math.PI / 2));
          }

          var chartData = radarService.radar.getDataByLocation(scope.locationActive);

          var arcStatusEnter = svgArcs.selectAll("g").data(chartData).enter().append("g")
            .attr("class", "ring");
          var arcCategoryEnter = arcStatusEnter.selectAll("path")
            .data(function (d) {
              return d.categories;
            })
            .enter()
            .append("g")
            .attr("class", "slice");

          var k = 0;
          var l = 0;
          var numRings = _.size(radarService.statuses) + 1;
          arcCategoryEnter.append("path")
            .attr("fill",
              function (d, slice, ring) {

                var sliceColor = '#ffffff';

                if (slice === pieNumber || pieNumber === undefined) {
                  sliceColor = colorPattern[l][slice];
                }
                if (slice === numRings - 1) {
                  l++;
                }
                return sliceColor; //colorPattern[slice];
              })
            .datum(function (d, i, j) {
              //var numRings = _.size(radarService.statuses) + 1;
              var innerRadius, outerRadius;
              switch (k) {
                case 0:
                  innerRadius = 0;
                  outerRadius = arcSize / 1.82;
                  break;
                case 1:
                  innerRadius = arcSize / 1.82;
                  outerRadius = arcSize / 1.18;
                  break;
                case 2:
                  innerRadius = arcSize / 1.18;
                  outerRadius = arcSize;
                  break;
              }

              d.arc = {
                innerRadius: innerRadius,
                outerRadius: outerRadius,
                k_index: k
              };

              _.extend(d.arc, categoryArcs[d.label]);

              if (i === numRings - 1) {
                k++;
              }
              return d;
            })
            .attr("d",
              function (d) {
                return arc
                  .innerRadius(d.arc.innerRadius).outerRadius(d.arc.outerRadius).startAngle(d.arc.startAngle)
                  .endAngle(d.arc.endAngle)(d.arc);
              })
            .on('mouseover',
              function (d) {
                d.active = true;
                scope.redrawTechCircles();
              })
            .on('mouseout',
              function (d) {
                d.active = false;

                scope.redrawTechCircles();
              });

          var nodeStatusEnter = svgNodes.selectAll("g").data(chartData).enter().append("g")
            .attr("class", "tech");
          var m = 0;
          var nodeCategoryEnter = nodeStatusEnter.selectAll("g")
            .data(function (d) {
              return d.categories;
            })
            .enter()
            .append("g")
            .datum(function (category, categoryIndex) {
              category.color = colorPattern[0][categoryIndex];
              category.colors = [];
              category.colors[0] = colorPattern[0][categoryIndex];
              category.colors[1] = colorPattern[1][categoryIndex];
              category.colors[2] = colorPattern[2][categoryIndex];

              return category;
            })
            .attr("class", "category");

          var technologies;
          window.techs = [];

          var truncatedLabelLength = 10;

          function getTechLabelSubstring(label) {
            return (label.length <= truncatedLabelLength) ?
              label :
              label.substring(0, truncatedLabelLength - 1) + "...";
          }

          function drawTech() {
            technologies = nodeCategoryEnter.selectAll("g")
              .data(function (d) {
                return d.technologies;
              },
                function (d) {
                  return d.label;
                });

            //$log.info("Redrawing");
            scope.technologies = technologies;
            var techEnter = technologies.enter().append("g").attr("class", "tech-label").attr("rel",
              function (d) {
                var $techList = $('.techList li:visible');

                $techList.each(function (item) {
                  var $this = $(this);
                  if ($this.attr('rel') === d.label) {
                    $this.attr('data-technology', d);

                  }
                });
                return d.label;
              })
              .on('mouseover',
                function (d) {
                  d.active = true;
                  window.isHover = true;
                  scope.redrawTechCircles();
                })
              .on('mouseout',
                function (d) {
                  d.active = false;
                  window.isHover = false;
                  scope.redrawTechCircles();
                });

            //draw inner cirlce line
            techEnter.append("rect")
              .attr("width", defaultTechSize)
              .attr("height", defaultTechSize)
              .datum(function (d) {
                var parentData = d3.select(this.parentNode.parentNode).datum();
                var j = 0;

                d.x = d.y = 0;
                while (!d.x || !d.y || isOverlappingAnotherPoint(d) && j < 1000) {
                  applyRandomXY(parentData.arc, d);
                  j++;
                }

                return d;
              })
              .style("stroke", "#333")
              .style("stroke-width", "0px")
              .style("fill", "#fff")
              .style("opacity", "1")
              .attr("rx", 3)
              .attr("ry", 3)
              .attr("x",
                function (d) {
                  if (d.isNew !== true) {
                    return 100000;
                  }
                  return d.x - defaultTechSize / 2;
                }).attr("y",
                  function (d) {
                    if (d.isNew !== true) {
                      return 100000;
                    }
                    return d.y - defaultTechSize / 2;
                  });

            techEnter.append("circle").attr("r", defaultTechRadius)
              .datum(function (d) {
                if (d.isNew === true) {
                  return d;
                }
                var parentData = d3.select(this.parentNode.parentNode).datum();
                var j = 0;

                d.x = d.y = 0;
                while (!d.x || !d.y || isOverlappingAnotherPoint(d) && j < 1000) {
                  applyRandomXY(parentData.arc, d);
                  j++;
                }
                return d;
              })
              .style("stroke", "#333")
              .style("stroke-width", "0px")
              .style("fill", "#fff")
              .style("opacity", "1")
              .attr("cx",
                function (d) {
                  if (d.isNew === true) {
                    return 100000;
                  }
                  return d.x;
                }).attr("cy",
                  function (d) {
                    if (d.isNew === true) {
                      return 100000;
                    }
                    return d.y;
                  });
            techEnter.append("text")
              .text(function (d) {
                return (d.index + 1); //getTechLabelSubstring(d.label);
              })
              .attr('x',
                function (d) {
                  return parseInt(d.index) > 8 ? d.x - 7 : d.x - 3;
                })
              .attr('y',
                function (d) {
                  return d.y + 3.5;
                })
              .attr('fill', 'black')
              .attr('font-weight', 'bold')
              .attr('font-size', '11px');
            technologies.exit().remove();
          }

          scope.groupActive = radarService.groupActive;
          scope.radarData = chartData;
          scope.$watch('radarData', function (e) {
            drawTech();
          }, true);

          scope.techList = radarService.techList;

          drawTech();

          function interpolateText(string, initialLength, index) {
            return function (t) {
              return t === 0 ?
                getTechLabelSubstring(string) :
                string.substring(0, Math.round((string.length - initialLength) * t) + initialLength);
              //return index;
            };
          }

          function reverseInterpolateText(string, initialLength, index) {
            return function (t) {
              var charsToRemove = t * (string.length - initialLength);
              //return t == 1 ? getTechLabelSubstring(string) : string.substring(0, string.length - charsToRemove);
              return index;
            };
          }

          scope.redrawTechCircles = function (techs, noCallAplly) {
            if (techs === undefined) {
              techs = technologies;
            }

            if (noCallAplly !== true) {
              scope.$apply();
            }

            techs.selectAll("circle").transition()
              .duration(100)
              /*            .attr("r", function (d) {
               return d.active ? hoverTechRadius : (d.radius ? d.radius : defaultTechRadius);
               })*/
              /*            .style("stroke-width", function (d) {
                            //return d.active ? '0px' : '1px';
                            return window.isHover ? '0px' : '0px';
                          })*/
              .style("fill",
                function (d) {
                  //return d.active ? 'transparent' : 'white';
                  //return window.isHover ? '#ccc' : 'white';
                  return window.isHover ? d.active ? 'transparent' : '#ddd' : '#fff';
                });

            techs.selectAll("rect").transition()
              .duration(100)
              /*.style("stroke-width", function (d) {
                //return d.active ? '0px' : '1px';
                return window.isHover ? '0px' : '0px';

              })*/
              .style("fill",
                function (d) {
                  //return d.active ? 'transparent' : 'white';
                  return window.isHover ? d.active ? 'transparent' : '#ddd' : '#fff';
                  //return window.isHover ? 'transparent' : 'white';

                });

            techs.selectAll("text")
              .style('fill',
                function (d) {
                  //return d.active ? '#fafafa' : '#000';
                  if (window.isHover) {
                    if (d.active) {
                      return '#FFF';
                    }
                    return '#aaa';
                  }
                  return '#000';
                })
              //.transition()
              //.duration(200)
              .tween("text",
                function (d) {
                  var node = this;
                  var interpolationFunction = d.active ? interpolateText : reverseInterpolateText;
                  var i = interpolationFunction(d.label,
                    Math.min(this.textContent.length, truncatedLabelLength),
                    d.index);
                  return function (t) {
                    node.textContent = d.active ? i(t) : i(t) + 1;

                    node.fill = 'white'; //d.active ? 'white' : 'black';
                  };
                });
          }

          //window.redraw = scope.redrawTechCircles();
        }

        renderChart();

        handleTechListOnClick();


        $('.radar0').on('click',
          function (e) {
            e.preventDefault();
            e.stopPropagation();
            scope.groupActive = 'Tools';
            radarService.groupActive = 'Tools';
            $('.radar-pie').removeClass('selected');
            $('.title').removeClass('selected');
            $('.title0').addClass('selected');
            $('.techList').hide();
            $('.techList-' + scope.groupActive.replace(' & ', '')).show();
            $(this).addClass('selected');

            renderChart();
          });
        $('.radar1').on('click',
          function (e) {
            e.preventDefault();
            e.stopPropagation();
            scope.groupActive = 'Techniques & Languages';
            radarService.groupActive = 'Techniques & Languages';
            $('.radar-pie').removeClass('selected');
            $('.title').removeClass('selected');
            $('.title1').addClass('selected');
            $('.techList').hide();
            $('.techList-' + scope.groupActive.replace(' & ', '')).show();
            $(this).addClass('selected');
            renderChart();
          });
        $('.radar2').off('click').on('click',
          function (e) {
            e.preventDefault();
            e.stopPropagation();
            scope.groupActive = 'Platforms';
            radarService.groupActive = 'Platforms';
            $('.radar-pie').removeClass('selected');
            $('.title').removeClass('selected');
            $('.title2').addClass('selected');
            $(this).addClass('selected');
            $('.techList').hide();
            $('.techList-' + scope.groupActive.replace(' & ', '')).show();
            renderChart();
          });
        $('.radar3').off('click').on('click',
          function (e) {
            e.preventDefault();
            e.stopPropagation();
            scope.groupActive = 'Frameworks & Libraries';
            radarService.groupActive = 'Frameworks & Libraries';
            $('.radar-pie').removeClass('selected');
            $('.title').removeClass('selected');
            $('.title3').addClass('selected');
            $(this).addClass('selected');
            $('.techList').hide();
            $('.techList-' + scope.groupActive.replace(' & ', '')).show();
            renderChart();
          });

        $('#select-SaiGon').off('click').on('click',
          function (e) {
            e.preventDefault();
            e.stopPropagation();

            $('.select-location').removeClass('selected');
            $(this).addClass('selected');
            scope.locationActive = "SaiGon";
            radarService.locationActive = "SaiGon";
            renderChart();
          });

        $('#select-HaNoi').off('click').on('click',
          function (e) {
            e.preventDefault();
            e.stopPropagation();

            $('.select-location').removeClass('selected');
            $(this).addClass('selected');
            scope.locationActive = "HaNoi";
            radarService.locationActive = "HaNoi";
            renderChart();
          });

        $('#select-all').off('click').on('click',
          function (e) {
            e.preventDefault();
            e.stopPropagation();

            $('.select-location').removeClass('selected');
            $(this).addClass('selected');
            scope.locationActive = "All";
            radarService.locationActive = "All";
            renderChart();
            //render
          });

        //.on('click', function(d, i){console.log(d,i);});
        //slices.selectAll("path").data(function(d) {console.log(d); return d;})

      }
    }
  }
]);
