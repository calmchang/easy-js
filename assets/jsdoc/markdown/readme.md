<a id="module_usecounter"></a>
## <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:4px;color:rgb(71, 128, 227);background:#ede6e6;">G</span>        useCounter

* [    useCounter](#module_usecounter)
    * [    useCounter()](#module_usecounter__usecounter) ⇒ <code>UseCounterResult</code>
    * [    UseCounterResult](#module_usecounter__usecounterresult)

<a id="module_usecounter__usecounter"></a>
### <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:4px;color:rgb(71, 128, 227);background:#ede6e6;">M</span>        useCounter() ⇒ <code>UseCounterResult</code>
加法计数器

**Example**  
```js
const counter= useCounter();
const onAdd=()=>{counter.addCount()}
return <span>当前计数器:{counter.count}</span>
```
<a id="module_usecounter__usecounterresult"></a>
### <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:4px;color:rgb(71, 128, 227);background:#ede6e6;">T</span>        UseCounterResult
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> |  |
| req.count | <code>number</code> | 当前计数器的值 |
| req.addCount | <code>function</code> | 计数器的值+1。 ()=>void |


