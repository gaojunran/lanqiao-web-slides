    
    /**
     * 2024年省赛。中等难度。
     */
    
    
    /**
    * 返回两个集合的差集 a-b
    * @param a 类型为 XSet 的集合
    * @param b 类型为 XSet 的集合
    * @returns {XSet} 返回差集集合，类型为 XSet
    */
    function difference(a, b) {
        // 从a中筛选出不在b中的元素
        return new XSet([...a].filter(it => !b.has(it)))
    }
    /**
     * 返回两个或多个集合的交集
     * @param a 类型为 XSet 的集合
     * @param bSets 元素类型为 XSet 的数组
     * @returns {XSet} 返回交集集合，类型为 XSet
     */
    function intersection(a, ...bSets) {
        // 从a中筛选出在bSets的每个set都出现的元素
        return new XSet([...a].filter(it => bSets.every(set => set.has(it))));
    }

    function intersection2(a, ...bSets) {
        // 从a中筛选出在bSets的每个set都出现的元素
        return new XSet(bSets.reduce((acc, cur) => {
            return [...acc].filter(it => cur.has(it))
        }, [...a]));
    }


    /**
    * 返回两个或多个集合的并集
    * @param a 类型为 XSet 的集合
    * @param bSets 元素类型为 XSet 的数组
    * @returns {XSet} 返回并集集合，类型为 XSet
    */
    function union(a, ...bSets) {
       // 把a和bSets的所有元素全部放入XSet中，自然去重。
        return new XSet([...[...a], ...bSets.map(s => [...s]).flat()])
    }

    function union2(a, ...bSets) {
        return new XSet(bSets.reduce((acc, cur) => {
            return [...acc, ...cur]   // 重复也没关系，XSet会自动去重
        }, [...a]))
    }