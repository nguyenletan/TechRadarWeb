angular.module('techRadarApp').factory('radarService', [
    '$log', '$rootScope', '$timeout', 'localStorageWatcher',
    function($log, $rootScope, $timeout, localStorageWatcher) {

        var LOCAL_STORAGE_ID = 'sadc.technologyRadarData';
        categoryName = 'Frameworks & Libraries';

        function Radar(data) {

            this.detailData = [];

            this.data = [{
                    "label": "Core",
                    categories: []
                },
                {
                    "label": "Non-Core",
                    categories: []
                },
                {
                    "label": "Adopting",
                    categories: []
                }
            ];
            this.techList = [];
            this.techList2 = [];

            this.HaNoiTechList = [];
            this.SaiGonTechList = [];
            this.HaNoiData = [];
            this.SaiGonData = [];

            getDetailData(this.detailData);
            getData(this.data, this.techList);



            this.getDataByLocation = function(location) {
                console.log(location);
                if (location === "HaNoi" && this.HaNoiData.length > 0) {
                    return this.HaNoiData;
                } else if (location === "SaiGon" && this.SaiGonData.length > 0) {
                    return this.SaiGonData;
                }

                var result = $.extend(true, [], this.data); //JSON.parse(JSON.stringify(this.data));//_.clone(this.data);

                if (location === undefined || location === "All") {
                    fillIndex(result);
                    return result;
                } else {
                    //filter by location

                    for (let i of result) {

                        for (let category of i.categories) {

                            category.technologies = _.reject(category.technologies,
                                function(technology) {
                                    if (location === "HaNoi") {
                                        return technology.Location !== "HN";
                                    } else {
                                        return technology.Location !== "HCM";
                                    }
                                });
                            //category.technologies =[];
                        }


                    }
                    fillIndex(result);
                    return result;
                }
            }

            this.getTechList = function(location) {
                if (location === "HaNoi" && this.HaNoiTechList.length > 0) {
                    return this.HaNoiTechList;
                } else if (location === "SaiGon" && this.SaiGonTechList.length > 0) {
                    return this.SaiGonTechList;
                }

                var result = [];
                var radarData = this.getDataByLocation(location);

                function countDevBySkillAndLocation(skillName, location) {

                    var detailData = JSON.parse($('#nashtech-radar-detail-data').val());
                    //console.log(detailData);
                    var filterByLocation = _.filter(detailData,
                        function(d) {
                            //console.log(d);
                            if (location === "HaNoi" && d.Location === "HN") {
                                return true;
                            }
                            if (location === "SaiGon" && d.Location === "HCM")
                                return true;
                        });

                    var filterBySkillName = _.filter(filterByLocation, function(d) {
                        return d.Name === skillName;
                    });

                    var filterByAvailableSSESeniority = _.filter(filterBySkillName, function(d) {
                        return d.Seniority === 'SSE' && d.IsAvailable === 1;
                    });

                    var filterByUnAvailableSSESeniority = _.filter(filterBySkillName, function(d) {
                        return d.Seniority === 'SSE' && d.IsAvailable === 0;
                    });

                    var filterByUnAvailablePSESeniority = _.filter(filterBySkillName, function(d) {
                        return d.Seniority === 'PSE' && d.IsAvailable === 0;
                    });

                    var filterByAvailablePSESeniority = _.filter(filterBySkillName, function(d) {
                        return d.Seniority === 'PSE' && d.IsAvailable === 1;
                    });

                    var filterByAvailableSESeniority = _.filter(filterBySkillName, function(d) {
                        return d.Seniority === 'SE' && d.IsAvailable === 1;
                    });

                    var filterByUnAvailableSESeniority = _.filter(filterBySkillName, function(d) {
                        return d.Seniority === 'SE' && d.IsAvailable === 0;
                    });

                    // console.log(filterByLocation);
                    // console.log(location);
                    // console.log(skillName);
                    // console.log(filterBySkillName);
                    // console.log(`total: ${filterBySkillName.length}`);
                    // console.log(`PSE: ${filterByPSESeniority.length}`);
                    // console.log(`SSE: ${filterBySSESeniority.length}`);
                    // console.log(`SE: ${filterBySESeniority.length}`);

                    return {
                        AvailableSSE: filterByAvailableSSESeniority,
                        AvailablePSE: filterByAvailablePSESeniority,
                        AvailableSE: filterByAvailableSESeniority,
                        UnAvailableSSE: filterByUnAvailableSSESeniority,
                        UnAvailablePSE: filterByUnAvailablePSESeniority,
                        UnAvailableSE: filterByUnAvailableSESeniority
                    };

                }


                function getTechListCategoryNameInner(data, groupName) {
                    var resultInner = [];
                    //var categories = _.flatten(_.pluck(data, 'categories'));
                    for (var i = 0, n = data.categories.length; i < n; i++) {
                        var temp = _.where(data.categories, { label: data.categories[i].label });
                        temp[0].group = temp.group = groupName;
                        //console.log(temp);
                        for (var j = 0; j < temp[0].technologies.length; j++) {
                            var devDetail = {
                                AvailableSSE: [],
                                AvailablePSE: [],
                                AvailableSE: [],
                                UnAvailableSSE: [],
                                UnAvailablePSE: [],
                                UnAvailableSE: []
                            };
                            devDetail = countDevBySkillAndLocation(temp[0].technologies[j].Name, location);
                            temp[0].technologies[j].DevDetail = devDetail;
                        }
                        //console.log(temp);
                        Array.prototype.push.apply(resultInner, temp);

                    }

                    return resultInner;
                }

                var coreTechList = getTechListCategoryNameInner(radarData[0], 'Core');

                var nonCoreTechList = getTechListCategoryNameInner(radarData[1], 'Non-Core');

                var adpotingTechList = getTechListCategoryNameInner(radarData[2], 'Adopting');

                var temp1 = coreTechList.concat(nonCoreTechList);
                var techlist = temp1.concat(adpotingTechList);

                result = techlist;

                return result;
            };



            this.HaNoiData = this.getDataByLocation("HaNoi");
            this.SaiGonData = this.getDataByLocation("SaiGoi");

            this.HaNoiTechList = this.getTechList("HaNoi");
            this.SaiGonTechList = this.getTechList("SaiGon");
        }

        function getData(data, techList) {

            var rawData = JSON.parse($('#nashtech-radar-data').val());

            if (rawData === null) return;
            mappingData(rawData, data);
        }

        function getDetailData(detailData) {
            var rawData = JSON.parse($('#nashtech-radar-data').val());
            if (rawData === null) return;
            detailData = rawData;
        }

        function mappingData(serverData, chartData) {
            //techData.map(d=>d)
            var temp = _.groupBy(serverData,
                function(d) {
                    return d.MaturityLevels;
                });

            var coreList = _.groupBy(temp.Core,
                function(c) {
                    return c.NashTechCategory;
                });
            addMissingFields(coreList, 'Core');


            var nonCoreList = _.groupBy(temp.NonCore,
                function(c) {
                    return c.NashTechCategory;
                });
            addMissingFields(nonCoreList, 'Non-Core');

            var adoptingList = _.groupBy(temp.Adopting,
                function(c) {
                    return c.NashTechCategory;
                });
            addMissingFields(adoptingList, 'Adopting');


            chartData[0].categories = [
                { label: "Tools", technologies: [] },
                { label: "Techniques & Languages", technologies: [] },
                { label: "Platforms", technologies: [] },
                { label: "Frameworks & Libraries", technologies: [] }
            ];

            chartData[1].categories = [
                { label: "Tools", technologies: [] },
                { label: "Techniques & Languages", technologies: [] },
                { label: "Platforms", technologies: [] },
                { label: "Frameworks & Libraries", technologies: [] }
            ];

            chartData[2].categories = [
                { label: "Tools", technologies: [] },
                { label: "Techniques & Languages", technologies: [] },
                { label: "Platforms", technologies: [] },
                { label: "Frameworks & Libraries", technologies: [] }
            ];

            chartData[0].categories[0].technologies = Object.values(coreList['Tools']);
            chartData[0].categories[1].technologies = Object.values(coreList['Techniques & Languages']);
            chartData[0].categories[2].technologies = Object.values(coreList['Platforms']);
            chartData[0].categories[3].technologies = Object.values(coreList['Frameworks & Libraries']);
            chartData[0].categories.group = 'Core';

            chartData[1].categories[0].technologies = Object.values(nonCoreList['Tools']);
            chartData[1].categories[1].technologies = Object.values(nonCoreList['Techniques & Languages']);
            chartData[1].categories[2].technologies = Object.values(nonCoreList['Platforms']);
            chartData[1].categories[3].technologies = Object.values(nonCoreList['Frameworks & Libraries']);
            chartData[1].categories.group = 'Non-Core';

            chartData[2].categories[0].technologies = Object.values(adoptingList['Tools']);
            chartData[2].categories[1].technologies = Object.values(adoptingList['Techniques & Languages']);
            chartData[2].categories[2].technologies = Object.values(adoptingList['Platforms']);
            chartData[2].categories[3].technologies = Object.values(adoptingList['Frameworks & Libraries']);
            chartData[2].categories.group = 'Adopting';
        }

        function addMissingFields(data, groupName) {
            var i;
            for (i = 0; i < data['Frameworks & Libraries'].length; i++) {
                data['Frameworks & Libraries'][i].label = data['Frameworks & Libraries'][i].Name;
                data['Frameworks & Libraries'][i].isNew = false;
                if (groupName !== undefined) {
                    data['Frameworks & Libraries'][i].group = groupName;
                }
            }

            for (i = 0; i < data['Tools'].length; i++) {
                data['Tools'][i].label = data['Tools'][i].Name;
                data['Tools'][i].isNew = false;
                if (groupName !== undefined) {
                    data['Tools'][i].group = groupName;
                }
            }

            for (i = 0; i < data['Platforms'].length; i++) {
                data['Platforms'][i].label = data['Platforms'][i].Name;
                data['Platforms'][i].isNew = false;
                if (groupName !== undefined) {
                    data['Platforms'][i].group = groupName;
                }
            }

            for (i = 0; i < data['Techniques & Languages'].length; i++) {
                data['Techniques & Languages'][i].label = data['Techniques & Languages'][i].Name;
                data['Techniques & Languages'][i].isNew = false;
                if (groupName !== undefined) {
                    data['Techniques & Languages'][i].group = groupName;
                }
            }
        }


        function fillIndex(data) {
            for (var item of data) {
                item.categories.group = item.label;
                for (var category of item.categories) {
                    var i = 0;
                    category.technologies.group = item.label;
                    for (var technology of category.technologies) {

                        technology.index = i;
                        i++;
                    }
                }
            }
        }

        Radar.prototype.getTechnologies = function() {
            var categories = _.pluck(this.data, 'categories');
            return _.flatten(_.pluck(_.flatten(categories), 'technologies'));
        };


        function getCategories() {
            var categories = _.pluck(radar.data, 'categories');

            return _.pluck(categories, 'label');
        }




        function getStatuses() {
            return _.pluck(radar.data, 'label');
        }

        //getTechListByCategoryName('Techniques & Languages');

        var radarData = localStorageWatcher.syncWithLocalStorage(LOCAL_STORAGE_ID, this.data);

        var radar = new Radar(radarData);
        var o = {
            radar: radar,
            categories: getCategories(),
            statuses: getStatuses(),
            groupActive: 'Frameworks & Libraries',
            locationActive: 'SaiGon'

        };
        return o;
    }
]);