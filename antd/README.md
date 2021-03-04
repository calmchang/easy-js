

#### @DatePicker

* 在同Form组件联用时，指定validateTrigger为onBlur时会导致崩溃

环境:`antd 3.0.0` 现象:崩溃  
环境:`antd 3.26.20` 现象：数据赋值异常

```javascript
<FormItem>
  {getFieldDecorator(`time`, {
    validateTrigger: "onBlur",//问题代码,需要去掉
    initialValue: "",
  })(<DatePicker />)}
</FormItem>
```


#### @Select  
* optionFilterProp属性  
  当没有使用自定义`filterOption`来筛选的时候，默认情况下输入内容会在Option里value进行搜索  
  ```html
  <Option value='1'>jack</Option>
  ```
  输入`jack`的时候并`不会匹配到`  
  输入`1`的时候则`可以匹配到` 

  ```html
  <Option value='1' optionFilterProp='children'>jack</Option>
  ```
  输入`jack`可以`匹配到`   
  输入`1`的时候则`匹配不到`
 
* optionLabelProp  
  当多选的时候，控制选中的条目显示的内容，如下图，默认选中后显示的内容是`<Option>`中value的值，有时候我们想控制它显示的是其他属性的时候，则通过optionLabelProp来切换，比如optionLabelProp="label"时，则选中时显示的内容从`<Option label="cxx">`的label内获取

![image.png](http://img.vuedata.cn/selectOptionLabelProp.png)

#### @Table
* scroll
  使用了scroll:{y:xx}后造成标题栏不对齐的问题，需要设置每一列的width属性并且最好是百分比






#### @Form

* antd2~antd3 getFieldDecorator 合法的用法

```javascript
  getFieldDecorator(`list[${index}][keyname]`)(<Input />);
  getFieldDecorator(`list[${index}][keyname2]`)(<Input />);

  //✅ antd2 ✅ antd3
  setFieldsValue({
    [`list[0][keyname]`]: value1,
    [`list[0][keyname2]`]: value2
  });

  //✅ antd2  ❌antd3
  form.setFieldsValue({
    list: [{ keyname: value, keyname2: value2 }]
  });

  //❌ antd2 ❌ antd3
  setFieldsValue({
    [`list[0]['keyname']`]: value1,
    [`list[0]['keyname2']`]: value2
  });

  //❌ antd2 ❌ antd3
  setFieldsValue({
    [`list[0].keyname`]: value1,
    [`list[0].keyname2`]: value2
  });

```


```javascript
  getFieldDecorator(`list[${index}]['keyname']`)(<Input />)
  getFieldDecorator(`list[${index}]['keyname2']`)(<Input />)

  //✅ antd2 ✅ antd3
  setFieldsValue({
    [`list[0]['keyname']`]: value1,
    [`list[0]['keyname2']`]: value2
  });

  //✅ antd2 ❌ antd3  
  form.setFieldsValue({
    list: [{ keyname: value, keyname2: value2 }]
  });

  //❌ antd2 ❌ antd3
  setFieldsValue({
    [`list[0][keyname]`]: value1,
    [`list[0][keyname2]`]: value2
  });

  //❌ antd2 ❌ antd3
  setFieldsValue({
    [`list[0].keyname`]: value1,
    [`list[0].keyname2`]: value2
  });

```


```javascript
  getFieldDecorator(`list[keyname][${index}]`)(<Input />)
  getFieldDecorator(`list[keyname2][${index}]`)(<Input />)

  // ✅ antd2 ✅ antd3  
  setFieldsValue({
    [`list[keyname][0]`]: value1,
    [`list[keyname2][0]`]: value2
  });

  // ✅ antd2 ❌ antd3
  setFieldsValue(
    list:{
      keyname:[value,value2],
      keyname2:[value,value2]
  });

  // ❌ antd2 ❌ antd3  
  setFieldsValue({
    [`list['keyname'][0]`]: value1,
    [`list['keyname2'][0]`]: value2
  });

  // ❌ antd2  ❌ antd3 
  setFieldsValue({
    [`list.keyname[0]`]: value1,
    [`list.keyname2[0]`]: value2
  });

```


```javascript
  getFieldDecorator(`list[${index}].keyname`)(<Input />)
  getFieldDecorator(`list[${index}].keyname2`)(<Input />)

  // ✅ antd2 ✅ antd3  
  setFieldsValue({
    [`list[0].keyname`]: value1,
    [`list[0].keyname2`]: value2
  });
  // ✅ antd2 ✅ antd3  
  form.setFieldsValue({
    list: [{ type: "2", sub: "sub 2" }]
  });

  // ❌ antd2 ❌ antd3  
  setFieldsValue({
    [`list[0][keyname]`]: value1,
    [`list[0][keyname2]`]: value2
  });
  // ❌ antd2 ❌ antd3  
  setFieldsValue({
    [`list[0]['keyname']`]: value1,
    [`list[0]['keyname2']`]: value2
  });

```


```javascript
  getFieldDecorator(`list.config.keyname`)(<Input />)
  getFieldDecorator(`list.config.keyname2`)(<Input />)

  // ✅ antd2 ✅ antd3  
  setFieldsValue({
    [`list.config.keyname`]: value1,
    [`list.config.keyname2`]: value2
  });
  // ✅ antd2 ✅ antd3  
  form.setFieldsValue({
    list:{config:{keyname:value1,keyname2:value2}} 
  });

  // ❌ antd2 ❌ antd3  
  setFieldsValue({
    [`list[config][keyname]`]: value1,
    [`list[config][keyname2]`]: value2
  });
  // ❌ antd2 ❌ antd3  
  setFieldsValue({
    [`list['config']['keyname']`]: value1,
    [`list['config']['keyname2']`]: value2
  });

```



```javascript
  getFieldDecorator(`list[${index}][0]`)(<Input />)
  getFieldDecorator(`list[${index}][1]`)(<Input />)

  // ✅ antd2 ✅ antd3  
  setFieldsValue({
    [`list[0][0]`]: value1,
    [`list[0][1]`]: value2
  });

  // ✅ antd2 ✅ antd3
  setFieldsValue(
    list:[[value1,value2]]);

```



* 操作Form.Item时机的问题1：条件渲染

  如：当字段name输入为1时，将age设置为16并显示age  
  环境:antd2-3  

```javascript
  <FormItem>
    {getFieldDecorator(`name`, {
      onChange: (e) => {
        let name = e.target.value;
        let age = name === "1" ? "16" : "";
        setFieldsValue({
          name,
          age
        });
      }
    })(<Input />)}
  </FormItem>

  // ❌ 错误，由于age这个item在name不为1的时候不渲染，导致setFieldsValue无效
  {
    getFieldValue("name") === "1" ? (<FormItem>{getFieldDecorator(`age`)(<Input />)}</FormItem>) :""
  }
```

```javascript
// ✅ 方案一
{
  getFieldValue("name") === "1" ? (<FormItem>{getFieldDecorator(`age`)(<Input />)}</FormItem>) :
  (<FormItem>{getFieldDecorator(`age`)(<Input type="hidden" />)}</FormItem>)
}

// ✅ 方案二
<FormItem>
  {getFieldDecorator(`age`)(<Input style={{ display: getFieldValue("name") === "1" ? "" : "none" }} />)}
</FormItem>
```


* 操作Form.Item时机的问题2：条件渲染  
环境:antd4  

```javascript
const init = async () => {
  setLoading(true);
  await delay(3000);
  setData({
    id: "1101",
  });

  // ❌ 此时loading为true,form.reset并没任何效果
  - form.resetFields();
  - setLoading(false);

  // ✅ 解决方法：当loading变为false时再reset
  + setLoading(false);
  + form.resetFields();
};
if (loading) return <p>loading</p>;
return (
  <Form>
    <Form.Item name='id'></Form.Item>
    ...
  </Form>
)
```

#### @InputNumber

环境:antd3  
* 问题1：在和FormItem同时使用时，onChange事件抛出的value是number,而如果FormItem配置了rules进行校验的话，getFieldsValue获取到的值是string 
* 问题2：在输入整数的时候失去焦点后不会触发onChange,而当输入的是小数点的时候，失去焦点会再次触发onChange

重现地址：`https://codesandbox.io/s/antd3forminputnumberfanhuizhidewenti-xzn0t?file=/index.js`


