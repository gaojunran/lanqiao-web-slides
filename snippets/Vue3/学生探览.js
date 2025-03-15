/**
 * https://www.lanqiao.cn/problems/19909/learning/?contest_id=248
 * 
 * 这个题的模板代码质量很高，可以学一下，巩固一下Vue3的写法。
 * 
 */

import { ref, computed } from "vue";

const mockUrl = "./mock/data.json";

export default {
    setup() {
        const historyPrompts = [
            "入营前是否有 Offer",
            "是否党员",
            "是否参赛过蓝桥杯",
            "是否学生会",
            "是否学生干部",
            "是否是计算机及相关专业",
            "是否签订合同",
            "是否考研",
            "是否面试过",
        ];
        const searchText = ref("");
        const itemIndex = ref(-1);
        const items = ref([]);
        const chartDiv = ref();
        const names = computed(() => items.value.map((it) => it.name));
        const item = computed(() =>
            itemIndex.value >= 0 ? items.value[itemIndex.value] : undefined
        );
        const itemTimestamp = computed(() => {
            if (item.value === undefined) return undefined;
            const dt = new Date(item.value.timestamp);
            const year = dt.getFullYear();
            let month = dt.getMonth() + 1;
            let day = dt.getDate();
            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            return year + "-" + month + "-" + day;
        });
        const itemSynthScore = computed(() =>
            item.value === undefined
                ? undefined
                : Math.round(
                      item.value.scores.reduce((a, b) => a + b) /
                          item.value.scores.length
                  )
        );
        // TODO2 START 请在下面补充代码
        // const classAverageScores = ref([0, 0, 0]); // 请将此变量重写为计算属性
        const classAverageScores = computed(() => 
            items.value.reduce((acc, item) =>
                // map: Array(3) => Array(3)
                item.scores.map((score, index) => acc[index] + score), 
                Array.from({ length: 3 }, () => 0)) // or: [0, 0, 0]
            .map(score => Math.round(score / items.value.length))
        );

        // TODO2 END

        function queryNames(text, cb) {
            cb(
                names.value
                    .filter((n) => n.includes(text))
                    .map((s) => ({ value: s }))
            );
        }

        function onSearch() {
            itemIndex.value = items.value.findIndex(
                (it) => it.name === searchText.value
            );

            if (item.value === undefined) return;
            setTimeout(function () {
                const chart = echarts.init(chartDiv.value);
                const option = {
                    tooltip: {},
                    legend: {
                        data: ["我的表现", "班级平均表现"],
                    },
                    radar: {
                        // TODO3 START 请在下面补充代码
                        shape:'circle',
                        startAngle: 0,
                        indicator:[
                            { name: '技术能力得分', max: 100, min: 0 },
                            { name: '硬实力得分', max: 100, min: 0 },
                            { name: '软技能得分', max: 100, min: 0 }
                        ]
                        // TODO3 END
                    },
                    series: [
                        {
                            type: "radar",
                            areaStyle: {},
                            data: [
                                {
                                    value: item.value.scores,
                                    name: "我的表现",
                                },
                                {
                                    value: classAverageScores.value,
                                    name: "班级平均表现",
                                },
                            ],
                        },
                    ],
                };
                window.chartOption = option;
                try {
                    chart.setOption(option);
                } catch {}
            }, 0);
        }

        // TODO1 START 请在下面补充代码
        axios.get(mockUrl).then(res => {
            items.value = res.data
        })
        // TODO1 END

        window.getData = function () {
            return items.value;
        };
        window.getCA = function () {
            return classAverageScores.value;
        };
        window.searchStudent = function (name) {
            searchText.value = name;
            onSearch();
        };

        return {
            historyPrompts,
            searchText,
            itemIndex,
            items,
            chartDiv,
            item,
            itemTimestamp,
            itemSynthScore,
            queryNames,
            onSearch,
        };
    },
};
