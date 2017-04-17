/*!
 * @license FusionCharts JavaScript Library
 * Copyright FusionCharts Technologies LLP
 * License Information at <http://www.fusioncharts.com/license>
 *
 * @author FusionCharts Technologies LLP
 * @version fusioncharts/3.2.4-sr1.10100
 * @id fusionmaps.CoteDivoire.20.10-30-2012 06:16:33
 */
FusionCharts(["private","modules.renderer.highcharts-cotedivoire",function(){var p=this,k=p.hcLib,n=k.chartAPI,h=k.moduleCmdQueue,a=k.injectModuleDependency,i="M",j="L",c="Z",f="Q",b="left",q="right",t="center",v="middle",o="top",m="bottom",s="maps",l=false&&!/fusioncharts\.com$/i.test(location.hostname),r=!!n.geo,d,e,u,g;d=[{name:"CoteDivoire",revision:20,creditLabel:l,standaloneInit:true,baseWidth:510,baseHeight:560,baseScaleFactor:10,entities:{"CI.AG":{outlines:[[i,3964,3460,f,3918,3462,3851,3516,3782,3572,3705,3632,3630,3693,3641,3746,3668,3814,3656,3832,j,3449,3831,f,3411,3920,3383,3960,3355,4001,3333,4051,3311,4101,3276,4122,3279,4174,3294,4205,3299,4190,3340,4206,3386,4220,3434,4222,3442,4314,3444,4349,3447,4384,3468,4393,3489,4402,3519,4406,3534,4407,3587,4405,3639,4402,3722,4390,3805,4379,3854,4365,3843,4299,3843,4240,3843,4180,3856,4177,3868,4174,3924,4151,3980,4127,3991,4127,3992,4127,4084,4132,4135,4127,4165,4142,4196,4156,4220,4152,4212,4143,4207,4136,4191,4112,4191,4077,4191,4058,4198,4047,4204,4036,4204,4010,j,4221,4010,4221,3817,4191,3817,f,4191,3806,4185,3789,4179,3772,4179,3760,4179,3722,4167,3706,4155,3690,4126,3689,4097,3687,4089,3672,4082,3657,4069,3662,4063,3639,4051,3645,4051,3634,4044,3611,4037,3590,4039,3572,j,4031,3572,4031,3478,4026,3478,f,4002,3481,3976,3466,3971,3463,3967,3460,f,3966,3460,3964,3460,c]],label:"Agneby",shortLabel:"AG",labelPosition:[391.9,388.3],labelAlignment:[t,v]},"CI.BF":{outlines:[[i,1196,1947,f,1167,1942,1121,1920,1105,1912,1100,1889,1098,1877,1094,1852,1093,1850,1056,1785,1048,1770,1025,1766,999,1762,989,1752,986,1749,924,1717,908,1709,900,1690,896,1679,889,1655,885,1647,877,1624,869,1605,859,1600,805,1573,799,1572,j,799,1590,f,786,1587,775,1592,764,1597,756,1597,755,1598,754,1598,736,1610,734,1657,733,1679,726,1696,719,1713,719,1730,719,1741,723,1748,726,1754,726,1772,j,724,1795,f,752,1840,809,1842,847,1843,866,1874,885,1904,883,1940,881,1977,900,1989,920,2002,926,2033,932,2067,937,2078,938,2081,939,2082,j,939,2142,f,904,2147,879,2147,879,2155,874,2160,j,829,2160,829,2145,f,822,2143,796,2123,772,2105,760,2105,752,2105,731,2115,730,2115,707,2097,682,2080,669,2080,646,2080,639,2090,629,2103,604,2110,605,2104,596,2097,534,2083,481,2097,j,481,2197,f,523,2253,544,2267,567,2285,581,2294,606,2310,629,2312,656,2315,704,2363,754,2413,754,2443,754,2453,748,2459,745,2462,743,2467,j,766,2467,f,779,2479,785,2484,795,2493,796,2502,812,2498,826,2516,840,2535,856,2530,854,2539,862,2548,875,2561,879,2567,j,894,2567,f,911,2555,923,2547,945,2532,971,2532,1020,2532,1056,2502,1076,2487,1080,2462,1083,2448,1084,2417,1097,2394,1112,2380,1128,2365,1146,2361,1165,2357,1170,2371,1175,2386,1189,2399,1203,2412,1228,2458,1253,2504,1337,2487,1341,2450,1337,2381,1331,2266,1311,2196,1280,2088,1269,2027,1253,2028,1242,2016,1230,2002,1219,2002,1208,2002,1203,1982,f,1201,1970,1196,1947,c]],label:"Bafing",shortLabel:"BF",labelPosition:[113,218],labelAlignment:[t,v]},"CI.BS":{outlines:[[i,1914,3870,j,1894,3870,f,1861,3852,1835,3850,1808,3849,1781,3874,1754,3900,1733,3901,1712,3902,1705,3907,1698,3912,1684,3912,1670,3912,1614,3894,1557,3876,1554,3855,1532,3848,1534,3815,1521,3819,1521,3795,1493,3778,1485,3736,1480,3711,1481,3652,1471,3656,1469,3644,1469,3629,1469,3625,j,1458,3630,f,1449,3629,1440,3625,1439,3624,1439,3624,1437,3623,1436,3622,1424,3622,1387,3675,1349,3727,1349,3743,1349,3759,1371,3862,1372,3880,1389,3917,1390,3926,1389,3950,1390,3972,1401,3980,j,1401,4157,f,1413,4157,1413,4179,1413,4202,1409,4221,1401,4226,1396,4252,1392,4278,1369,4335,1326,4333,1279,4345,1232,4357,1184,4349,1189,4356,1189,4366,1189,4380,1174,4398,1161,4415,1164,4432,1168,4456,1160,4475,1158,4481,1139,4510,j,1139,4562,f,1146,4571,1161,4602,1179,4636,1179,4646,1179,4674,1164,4694,1155,4706,1124,4737,1098,4765,1079,4830,1071,4845,1062,4887,1055,4921,1044,4930,1036,4936,1036,4955,1036,4977,1034,4982,1019,5012,1019,5036,1019,5078,1020,5081,1033,5118,1039,5132,1038,5139,1039,5209,1039,5280,1033,5295,1026,5310,1026,5342,1026,5369,1039,5378,1051,5388,1051,5425,j,1066,5425,f,1109,5440,1164,5404,1219,5369,1231,5365,1260,5355,1310,5319,1356,5287,1387,5283,1418,5279,1464,5253,1510,5227,1524,5205,1583,5212,1606,5202,1625,5194,1653,5174,1681,5154,1750,5124,1818,5094,1842,5085,1867,5077,1924,5042,1981,5019,1999,5007,2012,4999,2035,4994,2059,4988,2076,4977,2096,4967,2107,4962,2126,4952,2157,4917,2187,4882,2264,4857,j,2264,4852,f,2265,4851,2266,4850,2286,4835,2341,4832,2360,4835,2376,4836,2376,4809,2379,4800,2381,4792,2388,4787,2394,4783,2394,4780,2392,4722,2391,4712,2388,4678,2415,4660,2460,4631,2471,4647,2474,4626,2473,4622,2472,4603,2471,4575,2470,4540,2462,4516,2453,4493,2449,4482,2428,4437,2426,4406,2425,4375,2406,4340,2392,4348,2371,4369,2361,4380,2338,4380,2324,4380,2297,4375,2265,4369,2259,4362,2247,4340,2240,4330,2236,4324,2232,4320,2222,4311,2209,4312,j,2209,4307,f,2216,4267,2216,4265,2216,4229,2204,4215,2191,4200,2155,4200,2128,4200,2125,4201,2121,4203,2099,4225,2076,4209,2076,4172,2078,4131,2076,4115,2064,4112,2039,4112,j,2039,4000,f,2019,3995,2009,3995,2003,3983,1994,3978,1980,3971,1979,3970,1967,3957,1934,3957,1945,3929,1938,3908,1935,3901,1931,3895,j,1929,3895,f,1926,3890,1926,3887,1923,3889,1915,3883,1914,3883,1914,3882,c]],label:"Bas Sassandra",shortLabel:"BS",labelPosition:[174.6,452.6],labelAlignment:[t,v]},"CI.DE":{outlines:[[i,1689,667,f,1697,664,1701,640,1704,627,1706,607,1709,598,1709,542,1653,532,1588,527,1521,523,1486,517,1491,550,1465,568,1436,587,1436,610,1436,623,1444,632,1451,642,1451,655,1451,665,1442,680,1432,694,1431,707,j,1371,707,f,1308,638,1228,642,1147,645,1136,624,1125,603,1118,570,1111,537,1096,520,1081,502,1044,502,1031,502,1011,510,991,517,979,517,966,517,926,507,907,507,885,538,863,574,856,582,842,602,815,615,791,627,776,652,770,665,749,666,738,667,716,667,706,669,696,681,685,693,676,697,611,728,598,758,598,760,597,763,590,791,566,816,541,841,541,873,541,890,546,915,557,921,571,953,584,980,599,982,597,999,611,1017,627,1037,631,1053,631,1054,631,1055,j,631,1170,f,634,1172,634,1180,619,1175,619,1208,619,1237,626,1247,634,1259,659,1270,701,1265,707,1265,723,1265,739,1295,754,1323,754,1345,754,1352,729,1382,706,1407,710,1433,714,1459,762,1503,j,799,1535,799,1572,f,805,1573,859,1600,869,1605,877,1624,885,1647,889,1655,896,1679,900,1690,908,1709,924,1717,986,1749,989,1752,999,1762,1025,1766,1048,1770,1056,1785,1093,1850,1094,1852,1098,1877,1100,1889,1105,1912,1121,1920,1167,1942,1196,1947,1201,1970,1203,1982,1208,2002,1219,2002,1230,2002,1242,2016,1253,2028,1269,2028,1263,1993,1263,1974,1265,1923,1259,1834,1254,1745,1262,1733,1270,1720,1303,1720,1335,1719,1346,1706,1357,1692,1363,1678,1368,1664,1379,1617,j,1451,1617,f,1466,1644,1481,1647,j,1541,1647,f,1542,1614,1544,1597,1546,1579,1569,1572,1592,1565,1613,1540,1613,1531,1613,1522,1611,1472,1604,1402,1603,1341,1581,1331,1560,1321,1559,1289,1558,1258,1568,1249,1578,1240,1601,1210,j,1601,1192,f,1588,1191,1573,1169,1558,1146,1559,1124,1559,1102,1590,974,j,1590,974,f,1560,966,1511,973,1484,960,1484,923,1484,891,1521,810,1527,784,1534,745,1544,718,1574,710,f,1657,678,1689,667,c]],label:"Denguele",shortLabel:"DE",labelPosition:[112.5,126.5],labelAlignment:[t,v]},"CI.DH":{outlines:[[i,1228,2458,f,1203,2412,1189,2399,1175,2386,1170,2371,1165,2357,1146,2361,1128,2365,1112,2380,1097,2394,1084,2417,1083,2448,1080,2462,1076,2487,1056,2502,1020,2532,971,2532,945,2532,923,2547,911,2555,894,2567,j,879,2567,f,875,2561,862,2548,854,2539,856,2530,840,2535,826,2516,812,2498,796,2502,795,2493,785,2484,779,2479,766,2467,j,743,2467,f,741,2474,741,2485,705,2484,642,2477,623,2477,601,2512,579,2547,579,2565,579,2582,595,2604,611,2626,611,2636,611,2664,570,2735,530,2804,509,2814,500,2810,486,2810,468,2810,452,2823,436,2836,411,2833,385,2830,362,2856,339,2882,339,2912,339,2943,369,2984,400,3026,401,3050,404,3093,421,3130,428,3144,447,3162,459,3174,459,3198,459,3240,425,3287,395,3331,401,3395,j,399,3400,399,3412,f,405,3414,415,3422,423,3430,436,3430,427,3461,398,3488,351,3532,342,3549,333,3566,313,3586,374,3632,394,3632,412,3632,421,3622,437,3601,459,3580,490,3555,501,3542,525,3502,539,3485,581,3451,591,3435,583,3437,586,3408,589,3379,614,3353,638,3327,661,3320,705,3389,759,3429,813,3470,808,3470,j,855,3470,f,912,3470,927,3468,965,3462,979,3440,982,3419,983,3410,987,3392,1011,3392,j,1091,3392,f,1182,3398,1382,3363,1379,3286,1380,3264,1380,3216,1374,3187,j,1374,3097,f,1387,3096,1391,3085,1391,3084,1392,3082,1391,2925,1392,2918,1399,2896,1405,2887,1411,2877,1413,2811,1415,2776,1424,2741,1402,2729,1371,2712,1341,2696,1342,2681,1343,2666,1342,2634,1342,2602,1326,2562,1314,2565,1312,2561,1311,2559,1312,2555,1314,2551,1329,2523,1335,2512,1337,2487,f,1253,2504,1228,2458,c]],label:"Dix Huit Montagnes",shortLabel:"DH",labelPosition:[98.8,299.6],labelAlignment:[t,v]},"CI.FR":{outlines:[[i,2506,3649,j,2457,3708,2446,3707,f,2444,3694,2425,3692,2415,3691,2401,3692,2371,3692,2358,3696,2335,3685,2318,3679,2285,3666,2273,3676,2265,3682,2264,3688,2264,3689,2265,3690,2265,3691,2266,3692,2252,3702,2221,3757,2209,3788,2188,3799,2167,3811,2137,3800,2108,3789,2086,3802,2064,3816,2054,3850,2049,3868,2017,3879,2012,3881,1964,3892,1970,3907,1938,3907,1945,3929,1934,3957,1967,3957,1979,3970,1980,3971,1994,3978,2003,3983,2009,3995,2019,3995,2039,4000,j,2039,4112,f,2064,4112,2076,4115,2078,4131,2076,4172,2076,4209,2099,4225,2121,4203,2125,4201,2128,4200,2155,4200,2191,4200,2204,4215,2216,4229,2216,4265,2216,4267,2209,4307,j,2209,4312,f,2222,4311,2232,4319,2244,4304,2284,4270,2325,4237,2336,4232,2357,4224,2399,4195,2438,4169,2459,4162,2455,4040,2484,3975,2506,3975,2510,3976,2521,3979,2539,3997,2542,4001,2551,4002,2559,4003,2564,4010,2572,4020,2590,4020,2610,4020,2676,3977,2715,3968,2740,3953,j,2761,3940,f,2780,3951,2805,3960,2826,3968,2851,3980,j,2851,3960,f,2866,3884,2866,3860,2867,3839,2882,3812,2899,3784,2904,3771,2896,3768,2889,3767,2878,3765,2853,3766,2828,3767,2815,3762,2803,3757,2789,3744,2775,3732,2769,3727,2748,3713,2748,3668,2749,3615,2739,3597,2716,3558,2708,3549,2689,3528,2650,3510,2650,3510,2649,3509,2588,3551,2549,3590,f,2542,3597,2506,3649,c]],label:"Fromager",shortLabel:"FR",labelPosition:[228.9,394.5],labelAlignment:[t,v]},"CI.HT":{outlines:[[i,1756,2622,f,1722,2594,1718,2597,1714,2601,1698,2627,1681,2654,1655,2656,1630,2658,1599,2637,1569,2615,1522,2616,1476,2617,1446,2681,1432,2711,1424,2741,1415,2776,1413,2811,1411,2877,1405,2887,1399,2896,1392,2918,1391,2925,1392,3082,1391,3084,1391,3085,1387,3096,1374,3097,j,1374,3187,f,1380,3216,1380,3264,1379,3286,1382,3363,1394,3369,1396,3385,1444,3390,1454,3390,j,1454,3535,f,1444,3540,1439,3540,j,1439,3624,f,1439,3624,1440,3624,1449,3629,1458,3629,j,1469,3625,f,1469,3629,1469,3644,1471,3656,1481,3652,1480,3711,1485,3736,1493,3778,1521,3795,1521,3819,1534,3815,1532,3848,1554,3855,1557,3876,1613,3894,1670,3912,1684,3912,1698,3912,1705,3907,1712,3902,1733,3901,1754,3900,1781,3874,1808,3849,1834,3850,1861,3852,1894,3870,j,1914,3870,1914,3882,f,1914,3883,1915,3883,1923,3889,1926,3887,1926,3890,1929,3895,j,1931,3895,f,1935,3901,1938,3907,1970,3907,1964,3892,2012,3881,2017,3879,2049,3868,2054,3850,2064,3816,2086,3802,2108,3789,2137,3800,2167,3811,2188,3799,2209,3788,2221,3757,2252,3702,2266,3692,2265,3691,2265,3690,2264,3689,2264,3688,2259,3667,2229,3639,2197,3610,2190,3595,2183,3580,2167,3570,2152,3560,2146,3547,2131,3519,2129,3515,2129,3513,2129,3481,2136,3437,2136,3417,j,2118,3375,f,2109,3356,2109,3350,2109,3342,2114,3322,2144,3317,2159,3317,2160,3308,2221,3237,2281,3166,2281,3138,2281,3121,2276,3110,2202,3101,2188,3072,2181,3058,2176,3055,2164,3047,2134,3047,2119,3047,2099,3079,2080,3110,2051,3110,2035,3110,2018,3095,1997,3078,1984,3075,1978,3073,1946,3071,1916,3066,1916,3052,1935,2957,1934,2897,1934,2879,1941,2865,1944,2860,1946,2841,1947,2827,1967,2815,1986,2803,2014,2783,2043,2764,2073,2734,2076,2731,2079,2728,2073,2713,2064,2679,2055,2652,2041,2647,2006,2637,1973,2610,1958,2610,1950,2626,1942,2643,1921,2649,1901,2654,1846,2652,f,1790,2650,1756,2622,c]],label:"Haut Sassandra",shortLabel:"HT",labelPosition:[168.7,325.4],labelAlignment:[t,v]},"CI.LC":{outlines:[[i,3260,2752,f,3191,2750,3122,2751,3054,2753,3032,2792,3010,2831,2933,2855,2908,2865,2900,2865,2890,2864,2887,2872,2881,2891,2880,2892,2866,2916,2838,2955,2828,2970,2792,3015,2756,3059,2732,3064,2709,3069,2683,3046,2658,3023,2634,3022,2611,3021,2575,3030,2539,3039,2518,3065,2510,3074,2487,3086,2489,3095,2489,3102,2489,3104,2489,3105,2497,3125,2508,3128,2524,3129,2535,3132,2533,3148,2549,3152,2570,3153,2578,3157,j,2578,3285,2565,3285,f,2563,3297,2563,3322,2563,3344,2564,3350,2566,3358,2578,3380,2586,3393,2597,3399,2603,3403,2618,3410,2647,3425,2648,3445,j,2649,3509,2649,3510,f,2688,3528,2707,3549,2715,3558,2738,3597,2748,3615,2747,3668,2747,3713,2768,3727,2774,3732,2788,3744,2802,3757,2814,3762,2827,3767,2852,3766,2877,3765,2888,3767,2895,3768,2903,3771,2921,3778,2943,3792,2973,3805,2981,3825,2982,3830,2983,3834,j,2983,3835,f,2986,3840,2992,3843,2999,3846,3018,3852,3027,3857,3039,3864,3049,3870,3061,3870,3090,3870,3128,3865,3138,3863,3153,3853,3169,3843,3187,3834,3206,3825,3217,3798,3224,3781,3226,3767,3228,3760,3229,3753,3230,3736,3221,3718,3212,3699,3196,3677,3180,3655,3180,3595,3180,3565,3182,3562,3192,3554,3208,3532,j,3208,3512,3170,3512,f,3154,3521,3128,3520,3127,3519,3125,3519,3114,3515,3105,3505,3096,3491,3090,3485,3071,3462,3055,3455,3030,3442,3013,3427,3013,3380,3010,3362,3037,3345,3070,3330,3088,3296,3101,3286,3127,3266,3130,3252,3135,3232,3187,3172,3238,3113,3238,3111,j,3233,3110,f,3234,3109,3235,3108,3245,3097,3245,3090,3245,3089,3230,3055,3223,2972,3239,2955,3255,2939,3267,2922,3277,2909,3292,2898,3295,2896,3298,2895,j,3298,2875,f,3291,2842,3274,2821,3260,2804,3260,2769,f,3260,2759,3260,2752,c]],label:"Lacs",shortLabel:"LC",labelPosition:[284.3,331],labelAlignment:[t,v]},"CI.LG":{outlines:[[i,3396,3824,f,3372,3808,3345,3807,3319,3806,3298,3800,3277,3794,3259,3767,j,3227,3767,f,3225,3781,3218,3798,3207,3825,3188,3834,3170,3843,3154,3853,3139,3863,3129,3865,3091,3870,3062,3870,3050,3870,3040,3864,3028,3857,3019,3852,3000,3846,2993,3843,2987,3840,2984,3835,j,2984,3834,f,2983,3830,2982,3825,2974,3805,2944,3792,2922,3778,2904,3771,2899,3784,2882,3812,2867,3839,2866,3860,2866,3884,2851,3960,j,2851,3980,f,2856,3983,2861,3985,2892,4001,2989,4022,3056,4047,3066,4081,3076,4116,3073,4162,3071,4208,3063,4215,3054,4223,3054,4250,3053,4270,3045,4278,3040,4283,3026,4292,j,3028,4310,f,3024,4328,3005,4369,2986,4411,2981,4440,j,2981,4630,f,2982,4683,2954,4690,2938,4694,2914,4692,2889,4688,2876,4687,2836,4685,2803,4702,2768,4720,2741,4720,2717,4720,2703,4702,2688,4685,2681,4685,2667,4685,2666,4741,2666,4769,2668,4806,2698,4804,2716,4803,2754,4801,2794,4798,2834,4796,2851,4792,2867,4789,2882,4787,2896,4785,2917,4781,2939,4777,2945,4776,2951,4775,2966,4768,2981,4761,3006,4753,3030,4745,3045,4737,3060,4730,3076,4730,3120,4730,3130,4708,3141,4713,3239,4713,3346,4713,3378,4704,3410,4696,3436,4683,3462,4670,3471,4670,3525,4665,3566,4665,j,3566,4655,f,3567,4655,3567,4655,3606,4665,3643,4652,3662,4646,3701,4622,3722,4610,3874,4610,3877,4610,3931,4610,3950,4541,3980,4542,4011,4544,4020,4548,4029,4552,4045,4552,4045,4552,4079,4552,4112,4552,4115,4544,4117,4537,4130,4514,4142,4491,4152,4483,4163,4474,4160,4422,4158,4370,4164,4355,4172,4331,4199,4307,4232,4279,4236,4272,4246,4258,4245,4201,4245,4186,4247,4175,4232,4164,4223,4155,4222,4154,4220,4152,4196,4156,4165,4142,4135,4127,4084,4132,3992,4127,3991,4127,3980,4127,3924,4151,3868,4174,3856,4177,3843,4180,3843,4240,3843,4299,3854,4365,3805,4379,3722,4390,3639,4402,3587,4405,3534,4407,3519,4406,3489,4402,3468,4393,3447,4384,3444,4349,3442,4314,3434,4222,3386,4220,3340,4206,3299,4190,3294,4205,3279,4174,3276,4122,3311,4101,3333,4051,3355,4001,3383,3960,3411,3920,3449,3831,j,3449,3828,f,3418,3835,3396,3824,c]],label:"Lagunes",shortLabel:"LG",labelPosition:[326.7,444.7],labelAlignment:[t,v]},"CI.MR":{outlines:[[i,2416,2812,f,2407,2776,2399,2766,2387,2751,2359,2752,2356,2736,2353,2690,2348,2650,2341,2656,2323,2637,2305,2637,2281,2637,2277,2631,2266,2615,2251,2605,2244,2600,2219,2600,2209,2585,2195,2585,2173,2585,2167,2595,2163,2602,2149,2630,2113,2681,2111,2685,2104,2703,2079,2728,2076,2731,2073,2734,2043,2764,2014,2783,1986,2803,1967,2815,1947,2827,1946,2841,1944,2860,1941,2865,1934,2879,1934,2897,1935,2957,1916,3052,1916,3066,1946,3071,1978,3073,1984,3075,1997,3078,2018,3095,2035,3110,2051,3110,2080,3110,2099,3079,2119,3047,2134,3047,2164,3047,2176,3055,2181,3058,2188,3072,2202,3101,2276,3110,2281,3121,2281,3138,2281,3166,2221,3237,2160,3308,2159,3317,2144,3317,2114,3322,2109,3342,2109,3350,2109,3356,2118,3375,j,2136,3417,f,2136,3437,2129,3481,2129,3513,2129,3515,2131,3519,2146,3547,2152,3560,2167,3570,2183,3580,2190,3595,2197,3610,2229,3639,2259,3667,2264,3688,2265,3682,2273,3676,2285,3666,2318,3679,2335,3685,2358,3696,2371,3692,2401,3692,2415,3691,2425,3692,2444,3694,2446,3707,j,2457,3708,2506,3649,f,2542,3597,2549,3590,2588,3551,2649,3509,2650,3509,2650,3509,j,2649,3445,f,2648,3425,2619,3410,2604,3403,2598,3399,2587,3393,2579,3380,2567,3358,2565,3350,2564,3344,2564,3322,2564,3297,2566,3285,j,2579,3285,2579,3157,f,2571,3153,2550,3152,2534,3148,2536,3132,2525,3129,2509,3128,2498,3125,2490,3105,2490,3104,2490,3102,2490,3095,2488,3086,2484,3070,2473,3049,2456,3020,2449,3017,2459,2947,2451,2906,2444,2866,2433,2850,f,2422,2834,2416,2812,c]],label:"Marahoue",shortLabel:"MR",labelPosition:[238.3,335.6],labelAlignment:[t,v]},"CI.MV":{outlines:[[i,1454,3390,f,1444,3390,1396,3385,1394,3369,1382,3363,1182,3398,1091,3392,j,1011,3392,f,987,3392,983,3410,982,3419,979,3440,965,3462,927,3468,912,3470,855,3470,j,808,3470,f,813,3470,759,3429,705,3389,661,3320,638,3327,614,3353,589,3379,586,3408,583,3437,591,3435,581,3451,539,3485,525,3502,501,3542,490,3555,459,3580,437,3601,421,3622,412,3632,394,3632,374,3632,313,3586,313,3587,312,3588,291,3609,272,3626,253,3644,238,3647,j,238,3765,f,266,3761,288,3775,289,3776,323,3805,338,3817,371,3814,410,3810,424,3815,427,3839,449,3848,451,3849,452,3849,476,3846,511,3850,548,3854,549,3861,549,3868,554,3875,j,589,3875,f,589,3850,619,3865,657,3859,683,3859,709,3859,724,3857,739,3855,748,3869,759,3888,761,3890,765,3892,813,3906,845,3916,848,3940,849,3941,849,3942,j,849,4005,f,884,4045,888,4052,909,4082,914,4122,960,4111,981,4142,1000,4187,1011,4212,j,1091,4212,f,1122,4212,1131,4226,1136,4234,1139,4250,1143,4258,1146,4283,1148,4308,1151,4315,1155,4324,1174,4338,1181,4343,1184,4348,1232,4357,1279,4345,1326,4333,1369,4335,1392,4278,1396,4252,1401,4226,1408,4221,j,1409,4221,f,1413,4202,1413,4179,1413,4157,1401,4157,j,1401,3980,f,1390,3972,1389,3950,1390,3926,1389,3917,1372,3880,1371,3862,1349,3759,1349,3743,1349,3727,1387,3675,1424,3622,1436,3622,j,1439,3622,1439,3540,f,1444,3540,1454,3535,c]],label:"Moyen Cavally",shortLabel:"MV",labelPosition:[109.6,375.6],labelAlignment:[t,v]},"CI.MC":{outlines:[[i,4339,2948,f,4288,2900,4249,2900,4235,2900,4215,2918,4195,2936,4162,2942,4130,2948,4109,2935,4097,2927,4092,2912,4084,2920,4077,2936,4071,2951,4061,2957,4058,2959,4046,2973,4031,2991,4031,3000,4031,3026,4055,3035,4079,3044,4079,3062,4079,3072,4013,3101,3946,3131,3946,3161,3946,3174,3952,3185,3959,3199,3969,3197,j,3969,3235,f,3962,3241,3949,3266,3940,3284,3926,3287,j,3926,3302,f,3927,3303,3936,3322,j,3931,3440,f,3933,3440,3945,3447,3951,3451,3958,3455,j,3967,3460,3967,3460,f,3971,3463,3976,3466,4002,3481,4026,3478,j,4026,3477,4031,3477,4031,3572,4039,3572,f,4037,3590,4044,3611,4051,3634,4051,3645,4063,3639,4069,3662,4082,3657,4089,3672,4097,3687,4126,3689,4155,3690,4167,3706,4179,3722,4179,3760,4179,3772,4185,3789,4191,3806,4191,3817,j,4221,3817,4221,4010,4204,4010,f,4204,4036,4198,4047,4191,4058,4191,4077,4191,4112,4207,4136,4212,4143,4220,4152,4222,4154,4223,4155,4232,4164,4247,4175,4252,4155,4269,4152,4270,4121,4272,4104,4276,4074,4294,4057,4309,4043,4318,4013,4328,3980,4334,3972,4353,3946,4377,3891,4396,3845,4421,3812,4413,3813,4410,3806,4410,3804,4409,3802,4409,3785,4409,3713,4410,3656,4401,3642,4392,3628,4374,3604,4356,3581,4354,3567,4348,3518,4339,3490,j,4329,3490,f,4328,3478,4318,3468,4309,3459,4309,3456,4325,3430,4326,3422,4330,3403,4341,3390,j,4341,3241,f,4370,3234,4411,3161,4459,3107,4440,3062,4417,3026,4403,3011,f,4390,2996,4339,2948,c]],label:"Moyen Comoe",shortLabel:"MC",labelPosition:[415.6,331.8],labelAlignment:[t,v]},"CI.NC":{outlines:[[i,3579,2477,f,3548,2493,3542,2498,3535,2502,3506,2502,3473,2502,3434,2495,3384,2487,3381,2467,j,3354,2467,f,3354,2494,3341,2549,j,3329,2599,f,3354,2635,3354,2660,3354,2685,3332,2692,3311,2700,3296,2695,3269,2727,3265,2732,3262,2735,3262,2752,3261,2759,3261,2769,3261,2804,3275,2821,3292,2842,3299,2875,j,3299,2895,f,3296,2896,3294,2898,3278,2909,3268,2923,3256,2939,3240,2955,3224,2972,3231,3055,3246,3089,3246,3090,3246,3097,3236,3108,j,3239,3111,f,3239,3113,3188,3172,3136,3232,3131,3252,3128,3266,3102,3286,3089,3296,3071,3330,3038,3345,3011,3362,3014,3380,3014,3427,3031,3442,3056,3455,3072,3462,3091,3485,3097,3491,3106,3505,3115,3515,3127,3519,3128,3519,3129,3520,3155,3521,3171,3512,j,3209,3512,3209,3532,f,3193,3554,3183,3562,3181,3565,3181,3595,3181,3655,3197,3677,3213,3699,3222,3718,3231,3736,3230,3754,3229,3760,3228,3767,j,3259,3767,f,3277,3794,3298,3800,3319,3806,3345,3807,3372,3808,3396,3824,3418,3835,3449,3829,3450,3828,3451,3828,3450,3830,3450,3832,j,3656,3832,f,3668,3814,3641,3746,3630,3693,3706,3633,3782,3572,3851,3516,3918,3462,3964,3460,j,3964,3458,3959,3455,f,3951,3451,3945,3447,3933,3440,3931,3440,j,3936,3322,f,3927,3303,3926,3302,j,3926,3287,f,3940,3284,3949,3266,3962,3241,3969,3235,j,3969,3197,f,3959,3199,3952,3185,3946,3174,3946,3161,3946,3131,4013,3101,4079,3072,4079,3062,4079,3044,4055,3035,4031,3026,4031,3000,4031,2991,4046,2973,4058,2959,4061,2957,4071,2951,4077,2936,4084,2920,4092,2912,4089,2902,4089,2888,4089,2878,4094,2874,4102,2868,4107,2859,4112,2849,4114,2813,4115,2778,4110,2758,4104,2737,4092,2735,4079,2733,4079,2723,4079,2712,4062,2694,4022,2654,4019,2650,4006,2634,3998,2606,3993,2588,3979,2540,j,3956,2540,f,3950,2552,3925,2552,3891,2552,3890,2539,3888,2509,3866,2485,3858,2476,3824,2463,3799,2453,3799,2430,3799,2414,3806,2395,3806,2388,3802,2374,3797,2358,3791,2355,3791,2354,3768,2351,3763,2350,3759,2348,3730,2359,3692,2390,3653,2421,3644,2427,f,3599,2451,3579,2477,c]],label:"N'zi Comoe",shortLabel:"NC",labelPosition:[356.3,309],labelAlignment:[t,v]},"CI.SV":{outlines:[[i,2755,560,f,2741,552,2729,540,2711,534,2705,532,2694,527,2691,517,j,2659,517,2659,530,2619,530,2619,542,2561,542,2561,530,2496,530,2496,517,2434,517,f,2421,532,2374,543,2325,555,2311,570,2283,598,2254,600,2234,601,2222,611,2211,620,2191,620,2147,620,2126,602,j,2111,604,f,1981,587,2021,522,2034,498,2050,480,2056,473,2062,446,2069,420,2056,396,2043,372,2026,337,2007,335,2003,318,2001,312,2001,282,2001,270,2011,245,2021,219,2021,210,2021,201,2001,180,j,1920,179,f,1915,210,1895,245,1867,289,1856,312,1804,335,1766,312,1766,300,1739,285,1713,271,1716,252,j,1671,252,1671,327,f,1681,335,1701,350,1721,365,1716,377,1691,394,1691,432,1691,471,1711,541,1711,542,1711,542,1710,542,1709,542,1709,598,1706,607,1704,627,1701,640,1697,664,1689,667,1657,678,1574,710,1544,718,1534,745,1527,784,1521,810,1484,891,1484,923,1484,960,1511,973,1560,966,1590,974,j,1590,974,f,1559,1102,1559,1124,1558,1146,1573,1168,1588,1191,1601,1192,j,1601,1210,f,1578,1240,1568,1249,1558,1258,1559,1289,1560,1321,1581,1331,1603,1341,1604,1402,1611,1472,1613,1539,j,1631,1521,f,1648,1505,1660,1500,1677,1492,1687,1529,1697,1566,1724,1572,1751,1579,1754,1555,1757,1531,1763,1507,j,1803,1506,f,1812,1528,1816,1530,1818,1532,1852,1532,1885,1532,1906,1488,1928,1444,1959,1402,1974,1457,2017,1476,2011,1484,2011,1573,2011,1647,2038,1671,2082,1708,2093,1736,2105,1764,2129,1778,2153,1793,2161,1800,2192,1869,2211,1907,2224,1932,2249,1939,2270,1927,2296,1937,2322,1946,2381,1992,2433,2036,2451,2032,j,2456,2032,f,2456,2003,2441,1983,2426,1964,2426,1962,2426,1956,2431,1930,2431,1910,2421,1895,2421,1892,2424,1851,2427,1807,2424,1782,2421,1752,2437,1737,2442,1732,2476,1712,2516,1690,2578,1666,2641,1642,2656,1640,j,2668,1635,2668,1488,f,2691,1456,2704,1428,2718,1400,2722,1362,2727,1324,2729,1290,j,2739,1290,f,2742,1290,2759,1286,2776,1282,2802,1306,2875,1297,2924,1318,2973,1339,2984,1402,3061,1533,3061,1567,3056,1584,3062,1598,3065,1607,3064,1622,j,3366,1622,f,3377,1615,3396,1640,3429,1655,3436,1665,3447,1679,3479,1682,3512,1685,3521,1695,3528,1702,3529,1717,3530,1733,3534,1737,3540,1745,3553,1750,3572,1756,3574,1757,3587,1764,3621,1762,3631,1767,3659,1782,3691,1791,3699,1797,3720,1814,3739,1820,3740,1820,3762,1825,3776,1827,3781,1832,3784,1834,3796,1851,3806,1865,3813,1869,3825,1866,3853,1863,3892,1872,3894,1793,3867,1766,3866,1757,3864,1742,3857,1741,3851,1739,3851,1730,3851,1689,3871,1667,j,3871,1645,f,3839,1641,3839,1590,3839,1577,3852,1558,3863,1540,3866,1532,3866,1531,3866,1530,3867,1521,3870,1481,3872,1453,3859,1445,3832,1442,3819,1440,3802,1419,3794,1420,j,3794,1415,f,3794,1400,3805,1388,3816,1376,3816,1363,3816,1357,3800,1334,3783,1309,3779,1295,3779,1295,3779,1295,j,3776,1295,f,3681,1294,3664,1288,3647,1282,3628,1263,3609,1245,3589,1242,3587,1239,3577,1196,3570,1166,3554,1160,3539,1154,3537,1117,j,3534,1063,3534,1063,f,3508,1063,3486,1039,3458,1007,3439,1005,j,3444,1000,f,3412,1005,3414,977,3400,978,3388,968,3387,968,3386,967,j,3354,967,f,3359,980,3338,980,3323,980,3300,965,3279,952,3264,955,3248,923,3218,926,3188,930,3187,917,3185,904,3183,888,3181,871,3161,860,3142,849,3113,831,3084,813,3037,792,2991,772,2975,758,2958,744,2950,721,2942,699,2931,660,2921,630,2894,557,c]],label:"Savanes",shortLabel:"SV",labelPosition:[232.9,106.6],labelAlignment:[t,v]},"CI.SB":{outlines:[[i,2989,4022,f,2892,4001,2861,3985,2856,3983,2851,3980,2826,3968,2805,3960,2780,3951,2761,3940,j,2740,3953,f,2715,3968,2676,3977,2610,4020,2590,4020,2572,4020,2564,4010,2559,4003,2551,4002,2542,4001,2539,3997,2521,3979,2510,3976,2506,3975,2484,3975,2455,4040,2459,4162,2438,4169,2399,4195,2357,4224,2336,4232,2325,4237,2284,4270,2244,4304,2232,4319,2236,4324,2240,4330,2247,4340,2259,4362,2265,4369,2297,4375,2324,4380,2338,4380,2361,4380,2371,4369,2392,4348,2406,4340,2425,4375,2426,4406,2428,4437,2449,4482,2453,4493,2461,4516,2470,4540,2471,4574,2472,4603,2473,4622,2474,4626,2471,4647,2460,4631,2415,4660,2388,4678,2391,4712,2392,4722,2394,4780,2394,4783,2388,4787,2381,4792,2379,4800,2376,4809,2376,4835,2425,4838,2440,4825,2476,4823,2494,4825,2513,4826,2531,4813,2550,4800,2556,4800,2561,4800,2571,4806,2581,4812,2591,4812,2636,4808,2668,4806,2666,4769,2666,4741,2667,4685,2681,4685,2688,4685,2703,4702,2717,4720,2741,4720,2768,4720,2803,4702,2836,4685,2876,4687,2889,4688,2914,4692,2938,4694,2954,4690,2982,4683,2981,4630,j,2981,4440,f,2986,4411,3005,4369,3024,4328,3028,4310,j,3026,4292,f,3040,4283,3045,4278,3053,4270,3054,4250,3054,4223,3063,4215,3071,4208,3073,4162,3076,4116,3066,4081,f,3056,4047,2989,4022,c]],label:"Sud Bandama",shortLabel:"SB",labelPosition:[272.3,438.8],labelAlignment:[t,v]},"CI.SC":{outlines:[[i,4504,4020,f,4447,3893,4421,3812,4396,3845,4377,3891,4353,3946,4334,3972,4328,3980,4318,4013,4309,4043,4294,4057,4276,4074,4272,4104,4270,4121,4269,4152,4252,4155,4247,4175,4245,4186,4245,4201,4246,4258,4236,4272,4232,4279,4199,4307,4172,4331,4164,4355,4158,4370,4160,4422,4163,4474,4152,4483,4142,4491,4130,4514,4117,4537,4115,4544,4112,4552,4079,4552,4045,4552,4045,4552,4029,4552,4020,4548,4011,4544,3980,4542,3950,4541,3931,4610,3950,4610,4004,4610,4019,4612,4042,4635,4059,4651,4101,4640,4111,4652,4129,4649,4165,4645,4189,4647,j,4189,4660,4261,4660,f,4268,4646,4294,4641,4323,4635,4329,4630,4343,4617,4359,4567,4359,4566,4374,4533,4381,4516,4381,4497,4382,4454,4382,4454,4386,4432,4408,4432,4428,4432,4446,4442,4469,4455,4469,4475,4469,4497,4444,4519,4419,4541,4419,4557,4419,4577,4441,4588,4474,4605,4481,4614,4483,4612,4596,4615,4599,4600,4630,4585,4658,4571,4679,4587,j,4679,4550,f,4671,4547,4669,4547,j,4669,4500,f,4690,4505,4689,4485,j,4701,4485,4701,4507,f,4709,4513,4709,4561,4709,4572,4710,4595,4709,4613,4701,4617,4697,4619,4677,4622,4663,4623,4654,4645,j,4764,4645,f,4762,4619,4771,4612,j,4771,4577,4759,4577,f,4759,4474,4741,4455,j,4741,4312,4725,4305,f,4715,4300,4711,4290,4709,4283,4685,4270,4632,4276,4621,4223,4620,4218,4619,4212,4607,4212,4593,4205,4580,4199,4572,4191,4565,4182,4560,4171,4544,4140,4531,4123,4518,4107,4521,4085,4524,4064,4516,4046,f,4507,4028,4504,4020,c]],label:"Sud Comoe",shortLabel:"SC",labelPosition:[446.1,430.6],labelAlignment:[t,v]},"CI.VB":{outlines:[[i,3436,1665,f,3429,1655,3396,1640,3377,1615,3366,1622,j,3064,1622,f,3065,1607,3062,1598,3056,1584,3061,1567,3061,1533,2984,1402,2973,1339,2924,1318,2875,1297,2802,1306,2776,1282,2759,1286,2742,1290,2739,1290,j,2729,1290,f,2727,1324,2722,1362,2718,1400,2704,1429,2691,1456,2668,1488,j,2668,1636,f,2669,1638,2656,1640,2641,1642,2579,1666,2516,1690,2476,1712,2442,1732,2437,1737,2421,1752,2424,1782,2427,1807,2424,1851,2421,1892,2421,1895,2431,1910,2431,1930,2426,1956,2426,1962,2426,1964,2441,1983,2456,2003,2456,2032,j,2461,2032,2461,2033,f,2456,2054,2486,2062,2518,2071,2516,2092,2547,2115,2588,2142,2628,2168,2671,2162,j,2671,2307,f,2584,2312,2565,2322,2547,2331,2516,2377,j,2391,2392,f,2365,2411,2361,2426,2356,2441,2376,2492,2364,2539,2356,2566,2347,2592,2346,2630,2335,2635,2341,2656,2348,2650,2353,2690,2356,2736,2359,2752,2387,2751,2399,2766,2407,2776,2416,2812,2422,2834,2433,2850,2444,2866,2451,2907,2459,2947,2449,3017,2456,3020,2473,3049,2484,3070,2488,3086,2511,3074,2519,3065,2540,3039,2576,3030,2612,3021,2636,3022,2659,3023,2685,3046,2710,3069,2733,3064,2757,3059,2793,3015,2829,2970,2839,2955,2867,2916,2881,2892,2882,2891,2888,2872,2891,2864,2901,2865,2909,2865,2934,2855,3011,2831,3033,2792,3055,2753,3123,2752,3192,2750,3262,2752,3262,2735,3265,2732,3269,2727,3296,2695,3311,2700,3332,2692,3354,2685,3354,2660,3354,2635,3329,2599,j,3341,2549,f,3354,2494,3354,2467,j,3381,2467,f,3384,2487,3434,2495,3473,2502,3506,2502,3535,2502,3542,2498,3548,2493,3579,2477,3599,2451,3644,2427,3653,2421,3692,2390,3730,2359,3759,2348,3754,2343,3752,2336,j,3754,2297,f,3775,2294,3774,2264,3772,2233,3763,2218,3754,2203,3754,2169,3753,2136,3733,2120,3713,2105,3711,2080,3710,2055,3726,2039,3741,2024,3740,1999,3740,1986,3739,1965,3761,1938,3774,1917,3786,1895,3811,1870,3812,1870,3813,1869,3806,1865,3796,1851,3784,1834,3781,1832,3776,1827,3762,1825,3740,1820,3739,1820,3720,1814,3699,1797,3691,1791,3659,1782,3631,1767,3621,1762,3587,1764,3574,1757,3572,1756,3553,1750,3540,1745,3534,1737,3530,1733,3529,1717,3528,1702,3521,1695,3512,1685,3479,1682,f,3447,1679,3436,1665,c]],label:"Vallee du Bandama",shortLabel:"VB",labelPosition:[307.6,218.6],labelAlignment:[t,v]},"CI.WR":{outlines:[[i,2017,1476,f,1974,1457,1959,1402,1928,1444,1906,1488,1885,1532,1852,1532,1818,1532,1816,1530,1812,1528,1803,1506,j,1763,1507,f,1757,1531,1754,1555,1751,1579,1724,1572,1697,1566,1687,1529,1677,1492,1660,1500,1648,1505,1631,1521,1632,1525,1630,1526,j,1613,1540,1613,1539,f,1592,1565,1569,1572,1546,1579,1544,1596,1542,1614,1541,1647,j,1481,1647,f,1466,1644,1451,1617,j,1379,1617,f,1368,1664,1363,1678,1357,1692,1346,1705,1335,1719,1302,1720,1270,1720,1262,1732,1254,1745,1259,1834,1265,1923,1263,1974,1263,1993,1269,2027,1280,2088,1311,2196,1331,2266,1337,2381,1341,2450,1337,2487,1335,2512,1329,2523,1314,2551,1312,2555,1311,2559,1312,2561,1314,2565,1326,2562,1342,2602,1342,2634,1343,2666,1342,2681,1341,2696,1371,2712,1402,2729,1424,2741,1432,2711,1446,2681,1476,2617,1522,2616,1569,2615,1599,2637,1630,2658,1655,2656,1681,2654,1698,2627,1714,2601,1718,2597,1722,2594,1756,2622,1790,2650,1846,2652,1901,2654,1921,2649,1942,2643,1950,2626,1958,2610,1973,2610,2006,2637,2041,2647,2055,2652,2064,2679,2073,2713,2079,2728,2104,2703,2111,2685,2113,2681,2149,2630,2163,2602,2167,2595,2173,2585,2195,2585,2209,2585,2219,2600,2244,2600,2251,2605,2266,2615,2277,2631,2281,2637,2305,2637,2323,2637,2341,2656,2335,2635,2346,2630,2347,2592,2355,2566,2364,2539,2376,2492,2356,2441,2360,2426,2365,2411,2391,2392,j,2516,2377,f,2547,2331,2565,2321,2584,2312,2671,2307,j,2671,2162,f,2628,2168,2588,2142,2547,2115,2516,2092,2518,2071,2486,2062,2456,2054,2461,2032,j,2451,2032,f,2433,2036,2381,1992,2322,1946,2296,1937,2270,1927,2249,1939,2224,1932,2211,1907,2192,1869,2161,1800,2153,1793,2129,1778,2105,1764,2093,1736,2082,1708,2038,1671,2011,1647,2011,1573,f,2011,1484,2017,1476,c]],label:"Worodougou",shortLabel:"WR",labelPosition:[179.4,209.1],labelAlignment:[t,v]},"CI.ZA":{outlines:[[i,4411,852,f,4400,841,4386,819,4372,803,4354,802,4324,805,4323,817,j,4295,792,f,4290,785,4279,783,j,4269,785,4269,795,4166,795,4166,782,4091,782,f,4091,775,4089,767,4069,768,4057,768,4036,768,4034,760,j,3945,760,f,3916,787,3897,791,3878,796,3857,786,3836,777,3828,784,3821,791,3786,837,3750,882,3721,872,3702,894,3641,905,3626,906,3617,915,3608,925,3599,930,3591,934,3586,941,3581,948,3579,950,j,3579,1032,f,3578,1034,3577,1035,3566,1046,3540,1061,3538,1062,3536,1063,3535,1063,3534,1063,j,3537,1117,f,3539,1154,3554,1160,3570,1166,3577,1196,3587,1239,3589,1242,3609,1245,3628,1264,3647,1282,3664,1288,3681,1294,3776,1295,j,3779,1295,f,3779,1295,3779,1296,3783,1309,3800,1334,3816,1357,3816,1363,3816,1376,3805,1388,3794,1400,3794,1415,j,3794,1420,f,3802,1419,3819,1440,3832,1442,3859,1445,3872,1453,3870,1481,3867,1521,3867,1530,3866,1531,3866,1532,3863,1540,3852,1558,3839,1577,3839,1590,3839,1641,3871,1645,j,3871,1667,f,3851,1689,3851,1730,3851,1739,3857,1741,3864,1742,3866,1757,3867,1766,3894,1793,3892,1872,3853,1863,3825,1866,3813,1869,3812,1870,3811,1870,3786,1895,3774,1917,3761,1938,3739,1965,3740,1986,3740,1999,3741,2024,3726,2039,3710,2055,3711,2080,3713,2105,3733,2120,3753,2136,3754,2169,3754,2203,3763,2218,3772,2233,3774,2264,3775,2294,3754,2297,j,3752,2336,f,3754,2343,3759,2348,3763,2350,3768,2351,3791,2354,3791,2355,3797,2358,3802,2374,3806,2388,3806,2395,3799,2414,3799,2430,3799,2453,3824,2463,3858,2476,3866,2485,3888,2509,3890,2539,3891,2552,3925,2552,3950,2552,3956,2540,j,3979,2540,f,3993,2588,3998,2606,4006,2634,4019,2650,4022,2654,4062,2694,4079,2712,4079,2723,4079,2733,4092,2735,4104,2737,4110,2758,4115,2778,4114,2813,4112,2849,4107,2859,4102,2868,4094,2874,4089,2878,4089,2888,4089,2902,4092,2912,4097,2927,4109,2935,4130,2948,4162,2942,4195,2936,4215,2918,4235,2900,4249,2900,4288,2900,4339,2948,4390,2996,4404,3011,4417,3026,4440,3062,4466,3048,4501,3005,4509,2996,4526,2977,4539,2961,4541,2947,4541,2946,4541,2945,j,4541,2832,f,4551,2812,4551,2784,4551,2755,4542,2741,4533,2726,4536,2709,4539,2692,4553,2682,4567,2671,4571,2632,4573,2619,4573,2579,4574,2542,4581,2527,4590,2510,4596,2481,4603,2452,4609,2440,4616,2426,4623,2402,4640,2397,4653,2360,4653,2343,4667,2333,4682,2321,4710,2306,4738,2290,4774,2233,4790,2208,4827,2183,4862,2158,4889,2101,4890,2098,4891,2095,4891,2076,4889,2045,4890,2033,4882,2021,4874,2009,4874,2000,4875,1948,4856,1895,4818,1791,4823,1695,4823,1691,4824,1687,4823,1674,4815,1656,4806,1635,4809,1615,4809,1611,4806,1522,4806,1512,4799,1505,4791,1498,4786,1492,4775,1467,4766,1462,4749,1453,4734,1435,4722,1416,4714,1406,4712,1404,4711,1402,j,4711,1367,f,4716,1362,4734,1336,4752,1313,4769,1320,j,4769,1167,f,4648,1189,4617,1142,4587,1096,4565,1045,4539,983,4529,965,4519,947,4469,910,c]],label:"Zanzan",shortLabel:"ZA",labelPosition:[421.3,191.1],labelAlignment:[t,v]}}}];g=d.length;if(r){while(g--){e=d[g];n(e.name.toLowerCase(),e,n.geo)}}else{while(g--){e=d[g];u=e.name.toLowerCase();a(s,u,1);h[s].unshift({cmd:"_call",obj:window,args:[function(w,x){if(!n.geo){p.raiseError(p.core,"12052314141","run","JavaScriptRenderer~Maps._call()",new Error("FusionCharts.HC.Maps.js is required in order to define vizualization"));return}n(w,x,n.geo)},[u,e],window]})}}}]);