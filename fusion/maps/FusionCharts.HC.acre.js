/*!
 * @license FusionCharts JavaScript Library
 * Copyright FusionCharts Technologies LLP
 * License Information at <http://www.fusioncharts.com/license>
 *
 * @author FusionCharts Technologies LLP
 * @version fusioncharts/3.2.4-sr1.10100
 * @id fusionmaps.Acre.20.10-30-2012 08:20:34
 */
FusionCharts(["private","modules.renderer.highcharts-acre",function(){var p=this,k=p.hcLib,n=k.chartAPI,h=k.moduleCmdQueue,a=k.injectModuleDependency,i="M",j="L",c="Z",f="Q",b="left",q="right",t="center",v="middle",o="top",m="bottom",s="maps",l=false&&!/fusioncharts\.com$/i.test(location.hostname),r=!!n.geo,d,e,u,g;d=[{name:"Acre",revision:20,creditLabel:l,standaloneInit:true,baseWidth:370,baseHeight:190,baseScaleFactor:10,entities:{"BR.AC":{outlines:[[i,1950,490,f,1945,488,1940,486,1925,479,1909,473,1849,449,1783,427,1619,370,1420,320,1413,318,1405,316,1362,305,1318,295,1272,293,1225,290,1210,288,1194,287,1030,275,862,249,850,247,837,245,j,143,55,133,51,f,132,52,132,54,131,56,131,59,131,61,131,62,131,75,137,78,142,81,142,92,142,100,135,105,124,113,122,113,109,117,82,151,82,152,81,153,78,155,72,161,41,171,41,185,41,194,54,211,57,216,60,220,66,230,66,234,66,238,55,254,44,270,44,285,44,296,51,308,55,311,67,316,j,84,319,f,88,321,96,334,116,364,116,374,116,390,105,407,101,414,96,421,j,96,437,f,101,452,104,459,105,461,105,463,108,469,124,473,132,475,140,484,143,487,146,490,156,504,156,514,j,157,525,f,158,529,171,536,183,544,193,556,209,571,213,578,218,587,218,603,263,618,283,629,288,632,299,646,302,651,306,657,315,669,315,680,316,699,326,705,329,708,332,710,351,723,357,725,385,730,399,741,413,759,415,761,426,772,439,792,443,798,448,805,455,815,455,838,456,849,460,857,465,872,470,875,485,884,488,892,497,905,498,913,j,498,929,498,930,f,499,933,499,943,j,493,972,473,1002,f,460,1020,458,1033,458,1035,458,1036,453,1047,450,1050,447,1054,444,1059,438,1068,436,1077,434,1094,415,1118,414,1129,433,1126,445,1134,457,1134,603,1134,606,1134,760,1133,784,1133,803,1154,817,1199,817,1201,819,1203,821,1207,826,1212,832,1216,832,1225,833,1237,833,1238,837,1246,841,1250,844,1256,876,1257,877,1257,877,1257,890,1257,895,1263,897,1272,899,1276,911,1301,911,1302,911,1309,915,1327,924,1340,925,1346,926,1347,934,1353,936,1355,938,1356,942,1366,945,1370,947,1373,949,1373,959,1378,968,1378,979,1378,992,1371,993,1371,994,1370,1005,1364,1008,1364,1047,1355,1064,1355,1081,1363,1108,1363,1123,1363,1125,1361,1132,1357,1136,1359,1157,1353,1168,1354,1174,1354,1182,1348,1190,1342,1195,1341,1222,1342,1238,1337,1259,1331,1285,1332,1297,1333,1299,1328,1301,1325,1313,1326,1332,1328,1355,1323,1371,1319,1382,1315,1400,1308,1400,1300,1423,1288,1449,1242,1455,1237,1461,1232,1484,1213,1499,1199,1502,1197,1504,1195,1508,1191,1559,1135,1573,1113,1591,1098,1613,1081,1619,1075,1638,1054,1660,1054,1668,1054,1708,1087,1719,1096,1730,1121,1742,1146,1742,1152,1742,1176,1708,1187,j,1709,1807,f,1726,1789,1757,1789,1788,1789,1795,1792,1810,1800,1833,1810,1850,1818,1894,1825,1922,1829,1932,1829,j,1936,1827,1936,1827,f,1967,1828,1982,1819,2008,1803,2022,1795,2038,1785,2040,1784,2072,1766,2097,1753,2097,1753,2098,1752,2147,1726,2168,1726,2174,1726,2238,1764,j,2238,1767,f,2238,1767,2239,1767,2253,1763,2265,1755,2275,1749,2282,1749,2294,1749,2317,1759,2334,1766,2356,1779,2360,1779,2376,1766,2392,1754,2421,1754,2437,1754,2459,1763,2482,1773,2493,1773,2499,1773,2508,1766,2510,1764,2513,1763,2521,1759,2531,1759,2532,1759,2534,1759,2555,1760,2583,1767,2594,1767,2614,1753,2634,1739,2641,1739,2657,1739,2698,1774,2699,1774,2700,1775,2703,1778,2706,1781,2754,1822,2781,1822,2853,1822,2853,1745,2853,1723,2890,1696,2923,1672,2921,1660,2920,1659,2920,1659,j,2921,1659,f,2925,1659,2929,1660,j,3002,1603,3082,1578,3192,1642,3267,1583,3284,1583,3293,1542,f,3301,1541,3309,1539,3342,1532,3365,1522,3424,1496,3419,1449,j,3570,1320,f,3581,1305,3592,1289,3614,1257,3631,1223,3640,1204,3648,1186,3635,1168,3605,1147,3575,1126,3569,1126,3561,1130,3540,1137,j,2418,730,2073,545,f,2015,517,1950,490,c]],label:"Acre",shortLabel:"AC",labelPosition:[184.5,94],labelAlignment:[t,v]}}}];g=d.length;if(r){while(g--){e=d[g];n(e.name.toLowerCase(),e,n.geo)}}else{while(g--){e=d[g];u=e.name.toLowerCase();a(s,u,1);h[s].unshift({cmd:"_call",obj:window,args:[function(w,x){if(!n.geo){p.raiseError(p.core,"12052314141","run","JavaScriptRenderer~Maps._call()",new Error("FusionCharts.HC.Maps.js is required in order to define vizualization"));return}n(w,x,n.geo)},[u,e],window]})}}}]);