* 插件机制
* 业务分离
* ECS
* 可观测
* Entity
* 测试

框架无关（ui，canvas，2D，3D）

数据 -> 展示 -> 交互 -> 数据...

```
实体 Entity:
{
    key: 唯一标识，
    components: []
}

组件 Component:
{
    key: 唯一标识
    data: {
        ...
    }
}

系统 System:
{

}


定义组件:
大小: {
    key: 'size',
    data: {
        width,
        height
    }
}

位置: {
    key: 'position',
    data: {
        x,
        y
    }
}

定义物料: 方块 {
    key: 'rect',
    components: [大小, 位置]
}
```

~~~
UI 层 : 新建
_______
交互层 : 发送消息
_______
数据层: 新建实体 
_______

~~~

~~~

UI 层 : 拖动位置
_______
交互层 : 发送消息
_______
数据层: 查询实体 -> 改变组件数据
_______
~~~