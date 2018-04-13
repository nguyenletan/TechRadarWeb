angular.module('techRadarApp').factory('radarService',
  [
    '$log', '$rootScope', '$timeout', 'localStorageWatcher',
    function ($log, $rootScope, $timeout, localStorageWatcher) {

      var LOCAL_STORAGE_ID = 'sadc.technologyRadarData';
      categoryName = 'Frameworks & Libraries';

      function Radar(data) {
        //this.data = defaultData;
        this.data1 = [
          {
            label: "Core",
            categories: [
              {
                label: 'Tools',
                technologies: [
                  { "label": "IIS", "isNew": false, "numberOfSE": 10, "numberOfSSE": 8, "numberOfPSE": 8 },
                  { "label": "Tomcat", "isNew": false, "numberOfSE": 80, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Apache", "isNew": false, "numberOfSE": 100, "numberOfSSE": 50, "numberOfPSE": 5 },
                  { "label": "Express", "isNew": false, "numberOfSE": 20, "numberOfSSE": 20, "numberOfPSE": 3 },
                  { "label": "Redis", "isNew": false, "numberOfSE": 10, "numberOfSSE": 10, "numberOfPSE": 8 },
                  { "label": "Ehcache", "isNew": false, "numberOfSE": 10, "numberOfSSE": 10, "numberOfPSE": 10 },
                  {
                    "label": "jUnit - NUnit - PHPUnit - OCUnit",
                    "isNew": false,
                    "numberOfSE": 50,
                    "numberOfSSE": 20,
                    "numberOfPSE": 5
                  },
                  { "label": "Appium", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  {
                    "label": "Composer - Nuget - Npm - Yarn",
                    "isNew": false,
                    "numberOfSE": 80,
                    "numberOfSSE": 10,
                    "numberOfPSE": 10
                  },
                  { "label": "Nginx", "isNew": false, "numberOfSE": 18, "numberOfSSE": 10, "numberOfPSE": 3 },
                  { "label": "Jenkin", "isNew": false, "numberOfSE": 40, "numberOfSSE": 10, "numberOfPSE": 3 },
                  { "label": "Grunt/Gulp", "isNew": false, "numberOfSE": 100, "numberOfSSE": 10, "numberOfPSE": 1 },
                  {
                    "label": "Sass/Less/PostCss",
                    "isNew": false,
                    "numberOfSE": 70,
                    "numberOfSSE": 20,
                    "numberOfPSE": 1
                  },
                  { "label": "SQLite", "isNew": false, "numberOfSE": 154, "numberOfSSE": 16, "numberOfPSE": 6 },
                  { "label": "Realm", "isNew": false, "numberOfSE": 20, "numberOfSSE": 40, "numberOfPSE": 2 },
                  {
                    "label": "SSIS/SSAA/SSRS",
                    "isNew": false,
                    "numberOfSE": 300,
                    "numberOfSSE": 30,
                    "numberOfPSE": 10
                  },
                  { "label": "MSSQL", "isNew": false, "numberOfSE": 280, "numberOfSSE": 90, "numberOfPSE": 1 },
                  { "label": "Oracle", "isNew": false, "numberOfSE": 222, "numberOfSSE": 50, "numberOfPSE": 7 },
                  { "label": "MySQL", "isNew": false, "numberOfSE": 333, "numberOfSSE": 20, "numberOfPSE": 2 },
                ]
              },
              {
                label: 'Techniques & Languages',
                technologies: [
                  { "label": "Javascript", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "HTML/CSS", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "C#", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "C++", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "PHP", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Java", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "SQL", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  {
                    "label": "Responsive web design",
                    "isNew": false,
                    "numberOfSE": 180,
                    "numberOfSSE": 72,
                    "numberOfPSE": 3
                  },
                  { "label": "OOP", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Go", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  {
                    "label": "Swift/Objective C",
                    "isNew": false,
                    "numberOfSE": 180,
                    "numberOfSSE": 72,
                    "numberOfPSE": 3
                  }
                ]
              },
              {
                label: 'Platforms',
                technologies: [
                  {
                    "label": "Windows",
                    "isNew": false,
                    "numberOfSE": 180,
                    "numberOfSSE": 72,
                    "numberOfPSE": 3
                  },
                  { "label": "MS Azure", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Android", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "IOS", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "JDK", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": ".NET", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "LAMP/LAEMP", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "NodeJs", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Wordpress", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  {
                    "label": "Phonegap/Cordova",
                    "isNew": false,
                    "numberOfSE": 180,
                    "numberOfSSE": 72,
                    "numberOfPSE": 3
                  },
                  { "label": "Windows server", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Cocoa", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                ]
              },
              {
                label: 'Frameworks & Libraries',
                technologies: [
                  { "label": "ASP.NET MVC", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Bootstrap", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": ".NET Web API", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "JSP", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Spring", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "JAX-WS/JAX-RS", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "EJB3", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "JMS/MDB", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "JDBC", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "AngularJS1", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  {
                    "label": "Entity Framework",
                    "isNew": false,
                    "numberOfSE": 180,
                    "numberOfSSE": 72,
                    "numberOfPSE": 3
                  },
                  { "label": "Symfony", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "jQuery", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                ]
              },
            ]
          },
          {
            label: "Non-Core",
            categories: [
              {
                label: 'Tools',
                technologies: [
                  { "label": "MSBuild/Nant", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "TeamCity", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "MVSTS", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "RedGate Ant", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Websphere MQ", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "ActiveMQ", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "HornetMQ", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "RabbitMQ", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "OSGI Platform", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  {
                    "label": "Spring Integration",
                    "isNew": false,
                    "numberOfSE": 180,
                    "numberOfSSE": 72,
                    "numberOfPSE": 3
                  },
                  { "label": "Oracle SOA/ESB", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Mule ESB", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "MemCache", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "JBoss AS", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Glassfish", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "WebSphere", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Lucene", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Solr", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Elastic Search", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  {
                    "label": "Websphere Process",
                    "isNew": false,
                    "numberOfSE": 180,
                    "numberOfSSE": 72,
                    "numberOfPSE": 3
                  },
                  { "label": "Oracle BPM", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Yeoman", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Webpack", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Capistrano", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Vagrant", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Puppet", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Firebase", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Hadoop", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 }
                ]
              },
              {
                label: 'Techniques & Languages',
                technologies: [
                  { "label": "Scala/Lift", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Groovy", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Ruby", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Python", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Typescript", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 }
                ]
              },
              {
                label: 'Platforms',
                technologies: [
                  { "label": "Windows Form", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "WPF", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  {
                    "label": "XML Web Services",
                    "isNew": false,
                    "numberOfSE": 180,
                    "numberOfSSE": 72,
                    "numberOfPSE": 3
                  },
                  { "label": "WCF", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Umbraco", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "SiteCore", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Kentico", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "DotNetNuke", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Dynamics CRM", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "MS Azure IAAS", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "SharePoint", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Liferay", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "CQ5", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Drupal", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Magento", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Moodle", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  {
                    "label": "Amazon Web Services",
                    "isNew": false,
                    "numberOfSE": 180,
                    "numberOfSSE": 72,
                    "numberOfPSE": 3
                  },
                  { "label": "Xamarin", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                ]
              },
              {
                label: 'Frameworks & Libraries',
                technologies: [
                  {
                    "label": "ASP.NET Web Forms",
                    "isNew": false,
                    "numberOfSE": 180,
                    "numberOfSSE": 72,
                    "numberOfPSE": 3
                  },
                  { "label": "Swing/JavaFX", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Struts", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "JSF", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Vaadin", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "WSO2", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Apache Camel", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "KendoUI", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "D3.js", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Lavarel", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Zend", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Yii", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Django", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Ruby on Rails", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Cocos2D, 3D", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "OpenGL ES", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                ]
              },
            ]
          },
          {
            label: "Adopting",
            categories: [
              {
                label: 'Tools',
                technologies: [
                  {
                    "label": "Eclipse Virgo (OSGI Server)",
                    "isNew": false,
                    "numberOfSE": 180,
                    "numberOfSSE": 72,
                    "numberOfPSE": 3
                  },
                  { "label": "Spark", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 }
                ]
              },
              {
                label: 'Techniques & Languages',
                technologies: [
                  { "label": "F#", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Microservices", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Mixed Reality", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 }
                ]
              },
              {
                label: 'Platforms',
                technologies: [
                  {
                    "label": "Universal Windows App",
                    "isNew": false,
                    "numberOfSE": 180,
                    "numberOfSSE": 72,
                    "numberOfPSE": 3
                  },
                  { "label": ".Net Core", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Spring Cloud", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Blockchain", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "IoT", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Big Data", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "JAMstack", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                ]
              },
              {
                label: 'Frameworks & Libraries',
                technologies: [
                  {
                    "label": "Entity Framework Core",
                    "isNew": true,
                    "numberOfSE": 180,
                    "numberOfSSE": 72,
                    "numberOfPSE": 3
                  },
                  { "label": "ReactJs", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "React Native", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "ASP.NET Core", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Angular4", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "Lift", "isNew": false, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  { "label": "VueJs", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 },
                  {
                    "label": "Machine Learning",
                    "isNew": true,
                    "numberOfSE": 180,
                    "numberOfSSE": 72,
                    "numberOfPSE": 3
                  },
                  { "label": "Tensorflow", "isNew": true, "numberOfSE": 180, "numberOfSSE": 72, "numberOfPSE": 3 }
                ]
              },
            ]
          }
        ];


        this.data = [
          {
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


        getData(this.data, this.techList);


        this.getDataByLocation = function (location) {

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
                  function (technology) {
                    if (location === "HaNoi") {
                      return technology.Location === "HN";
                    } else {
                      return technology.Location === "HCM";
                    }
                  });
                //category.technologies =[];
              }

              
            }
            fillIndex(result);
            return result;
          }
        }

        this.getTechList = function (location) {
          if (location === "HaNoi" && this.HaNoiTechList.length > 0) {
            return this.HaNoiTechList;
          } else if (location === "SaiGon" && this.SaiGonTechList.length > 0) {
            return this.SaiGonTechList;
          }

          var result = [];
          var radarData = this.getDataByLocation(location);

          function getTechListCategoryNameInner(data, groupName) {
            var resultInner = [];
            //var categories = _.flatten(_.pluck(data, 'categories'));
            for (var i = 0, n = data.categories.length; i < n; i++) {
              var temp = _.where(data.categories, { label: data.categories[i].label });
              temp[0].group = temp.group = groupName;
              Array.prototype.push.apply(resultInner, temp);

            }
            //resultInner.group = groupName;

            /*
             for (var i = 0, n = categories.length; i < n; i++) {
               if (i < 4) {
                 categories[i].group = 'Core';
               } else if (i < 8) {
                 categories[i].group = 'Non-Core';
               } else {
                 categories[i].group = 'Adopting';
               }
             }*/


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

        this.HaNoiData  = this.getDataByLocation("HaNoi");
        this.SaiGonData = this.getDataByLocation("SaiGoi");

        this.HaNoiTechList = this.getTechList("HaNoi");
        this.SaiGonTechList = this.getTechList("SaiGon");
      }

      function getData(data, techList) {

        var rawData = JSON.parse($('#nashtech-radar-data').val());

        if (rawData === null) return;
        mappingData(rawData, data);
        
      }

      function mappingData(serverData, chartData) {
        //techData.map(d=>d)
        var temp = _.groupBy(serverData,
          function (d) {
            return d.MaturityLevels;
          });

        var coreList = _.groupBy(temp.Core,
          function (c) {
            return c.NashTechCategory;
          });
        addMissingFields(coreList, 'Core');


        var nonCoreList = _.groupBy(temp.NonCore,
          function (c) {
            return c.NashTechCategory;
          });
        addMissingFields(nonCoreList, 'Non-Core');

        var adoptingList = _.groupBy(temp.Adopting,
          function (c) {
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

      Radar.prototype.getTechnologies = function () {
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
