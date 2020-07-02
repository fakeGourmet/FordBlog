---
title: Swift 学习笔记（一）
date: 2019-03-11
categories:
 - swift
tags:
 - swift
---

# 1 常量和变量
使用`let`定义变量，表示该值不可再被更改

使用`var`定义变量 ，表示将来可以被修改为不同的值

## 1.1 常量声明

``` swift
//定义数据类型
let score : Double = 88.8
//定义对象
let view : UIView = UIView()
```

## 1.2 变量声明
``` swift
var age : Int = 23
age = 13
```
## 1.3 常量和变量的注意点
1. 在开发中，一般优先使用常量，只有发现标识符需要修改时，在使用变量，这样做防止我们在不希望它值修改的情况下，在其他地方被修改。
2. 常量的本质：标识符指向的内存地址不可以被修改，但是可以通过内存地址找到对应的对象，修改对象内部的属性。
3. 省略：上面例子中`:Double` 和 `:Int`是可以省略的，事实上，我们也不需要经常使用类型标注，如果在定义一个变量或常量的时候就初始化一个值，那么Swift就可以推断出这个变量或常量的类型， 可以通过`option + 鼠标左键`来查看标识符类型。

``` swift
let score = 88.8 + 10 //swift会识别类型为 Double
let view = UIView()
```

4. 标识符名称，也就是变量和常量的名字不能包含空白字符、数学符号、箭头、保留的或者无效的Unicode码位、连线和制表符，也不能以数字开头。
## 1.4 if let 和 if var
对`if var` 的改变不影响原值。

``` swift
let name : String? = "Tom"
if var name = name {
    name = "Jerry"
}
print(name) //Optional("Tom")
```

# 2 基本运算
## 2.1 类型转换
Swift中相同类型的之间才可以进行运算，Swift中没有类似OC中的隐式类型转换，所以当两个变量类型不同时，需要进行强制类型转换。Swift是一门强类型语言，即使`Int8`类型和`Int`类型也不能直接进行运算，同样需要强制转换类型才可以。
强制类型转换 `Int`(标识符a)  、`Double`(标识符b)

``` swift
let n = 10
let x : Int8 = 5
let m = 10.5
let result = Double(n) + m // Int转化为Double
let result1 = Int(m) + n // Double转化为Int
let result2 = Int(x) + n // Int8 与 Int进行运算同样需要转化
```

### 2.1.1 as使用场合
（1）从派生类转换为基类，向上转型（upcasts）

``` swift
class Animal {}
class Cat: Animal {}
let cat = Cat()
let animal = cat as Animal
```

（2）消除二义性，数值类型转换

``` swift
let num1 = 42 as CGFloat
let num2 = 42 as Int
let num3 = 42.5 as Int
let num4 = (42 / 2) as Double
```

（3）`switch` 语句中进行模式匹配
如果不知道一个对象是什么类型，你可以通过`switch`语法检测它的类型，并且尝试在不同的情况下使用对应的类型进行相应的处理。

``` swift
switch animal {
case let cat as Cat:
    print("如果是Cat类型对象，则做相应处理")
case let dog as Dog:
    print("如果是Dog类型对象，则做相应处理")
default: break
}
```

### 2.1.2 as!使用场合
向下转型（Downcasting）时使用。由于是强制类型转换，如果转换失败会报 runtime 运行错误。

``` swift
class Animal {}
class Cat: Animal {}
let animal :Animal  = Cat()
let cat = animal as! Cat
```

### 2.1.3 as?使用场合
`as?` 和 `as!` 操作符的转换规则完全一样。但 `as?` 如果转换不成功的时候便会返回一个 `nil` 对象。成功的话返回可选类型值（optional），需要我们拆包使用。
由于 `as?` 在转换失败的时候也不会出现错误，所以对于如果能确保100%会成功的转换则可使用 `as!`，否则使用 `as?`

``` swift
let animal:Animal = Cat()
if let cat = animal as? Cat{
    print("cat is not nil")
} else {
    print("cat is nil")
}
```

## 2.2 区间运算符
1. 闭区间运算符 `(a...b)`，定义了从a到b的一组范围，并且包含a和b。要求 `a <= b`
2. 半开区间运算符 `(a..<b)`，定义了从a到b但不包括b的区间，要求`a<=b`，当`a=b`时那么返回的区间为空
3. 单侧区间运算符 `[2...]`，一般用于数组中，例如`list[2...]`即表示从list数组索引2开始一直到结束。注意这时2必须小于数组的count，否则编译器将会报错
当然也可以写成`[...2]`表示从0开始到2的索引，`[..<2]`表示从0开始到1的索引

``` swift
//输出0到5的方法
for i in 0...5 { print(i) }
for i in 0..<6 { print(i) }
```

# 3 逻辑分支
在OC中的逻辑控制，一般都会提到`if`，`if...else`，`switch`等，而在swift中多了一个`guard...else`。
## 3.1 guard...else
这是在swift2.0之后推出的，能使用`if...else`的地方都能使用`guard...else`，但是反过来未必。`guard`一定要和`else`一起使用，而且使用的地方也必须是在函数中。

``` swift
guard *判断语句* else {
    *****
    break\return\continue...
}
```

当判断语句的条件满足的时候，就会去执行语句组，但是在不满足的情况下，就会去执行`else`中的语句，并且必须写上`break`、`return`、`continue`等关键字作为结束符。
与`if`语句相同的是，`guard`也是基于一个表达式的布尔值去判断一段代码是否该被执行。 与`if`语句不同的是，`guard`只有在条件不满足的时候才会执行这段代码。 可以把`guard`近似的看做是`Assert`.
## 3.2 switch 特性
### 3.2.1 多条件判断

~~~ swift
switch gender {
case 0 , 1 :
    print("正常人")
    break
default :
    print("其他")
    break
}
~~~

### 3.2.2 区间判断

~~~ swift
let score = 88
switch score {
case 0..<60 :
    print("不及格")
case 60..<75 :
    print("中")
case 75..<90 :
    print("良")
case 90...100 :
    print("优")
default :
    print("不合理分数")
}
~~~

### 3.2.3 其他特性
1. `switch`后面的()可以省略

2. `case`语句结束，可以不加`break`，系统默认帮我们加上了`break`，如果希望`case`结束时产生穿透， 去除`break`效果需要加上 `fallthrough`。

3. 在每条`case`中必须包含至少一条可执行语句，不能为空。

4. `case`语句后面可以判断多个条件，每个条件之间用逗号隔开，如果任何一个条件匹配了，则会执行`case`下的语句

5. `Switch`可以判断多种类型，包括 浮点型，字符串类型，区间类型，元组

  ```swift
  // 这里用元组举例
  let point = (1,1) // 类型为(Int,Int)的元组
  switch point {
  case (0, 0):
   print("(0, 0) is at the origin")
  case (_, 0): // 如果不想匹配元组中的某一个值，可以用_代替
   print("(\(somePoint.0), 0) is on the x-axis")
  case (0, _):
   print("(0, \(somePoint.1)) is on the y-axis")
  case (-2...2, -2...2): // 元组中使用区间匹配
   print("(\(somePoint.0), \(somePoint.1)) is inside the box")
  default:
   print("(\(somePoint.0), \(somePoint.1)) is outside of the box")
  }// prints "(1, 1) is inside the box"
  ```

  

6. `Switch`可以将匹配到的值临时绑定为一个变量或者一个常量，来给`case`中的执行语句使用

  ```swift
  let personInfo = (name : "tom" , age : 20)
  switch personInfo {
  case (let x , 1..<18):
   print("未成年的人有\(x)")
  case (let x , 18..<100):
   print("成年的人有\(x)")
  default:
   print("没有匹配的人")
  }
  // print 成年的人有tom
  ```

7. 同时可以在`case`语句后面添加额外的`where`判断

8. `Switch`可以被打上标签循环使用

  ```swift
  var times = 0
  timeLoop : while times < 10 {
   times += 1
   switch times {
   case 6:
       break timeLoop
   case 4:
       continue timeLoop
   default:
       print("default")
   }
  }
  // print :  default default default default
  ```

  


# 4 数组
## 4.1 定义数组
* ```swift
  //定义不可变数组
  let array = ["name", "wj", "haha", "12weqw", "asdasdas"] // 推导方法
  let array1 : Array<String> = ["name", "wj", "haha"]
  let array2 : [String] = ["name", "wj", "haha"]
  
  //定义可变数组（泛型定义，需要指定类型）
  var arrayM = Array<String>()
  var arrayM = [String]() // 创建了一个可变数组，使用的较多的方法
  
  /*
  * 同时数组还为我们提供了初始化方法创建
  * repeating：表示数组存储对应类型的默认值
  * count：表示数组内元素的个数
  */
  var arr = Array(repeating: "a", count: 5)
  ```

  
## 4.2 可变数组的基本操作
```swift
// 获取数组元素个数
let count = arrayM.count
// 同时也可以使用isEmpty Bool值属性 来对数组是否为空进行快速判断
if arrayM.isEmpty {}
// 1. 添加元素
arrayM.append("xx_cc")
// 也可以使用 +=运算符在数组末尾添加新的同类型元素
arrayM += ["xx","cc"]
// 使用 insert方法添加元素到指定位置
arrayM.insert("js", at: 1)
// 删除元素
arrayM.remove(at: 0) // 返回被删除的元素
arrayM.removeAll() // 删除所有的
arrayM.removeLast() // 删除最后一个
arrayM.removeFirst() // 删除第一个
// 提取元素
let name = arrayM[0]
// 修改元素
arrayM[0] = "hh"
// 也可以使用区间类型修改多个元素
arrayM[2...3] = ["haha","xixi"]
```


## 4.3 数组遍历
```swift
for item in arrayM {
    print(item)
}
// 如果我们想要拿到数组中每个元组的值以及它的索引，我们可以使用enumerated()方法来返回数组中每一个元素的元组，元组中包含了元素的索引和值
for (index , item) in arrayM.enumerated(){
    print(index)
    print(item)
}
```


## 4.4 可变性
数组和其他的集合一样，具有值语义，数组赋值时，这个数组的内容会被复制
swift:

```swift
var x = [6,6,6]
var y = x
y.append(6)
y // [6,6,6,6]
x // [6,6,6]
```

OC:

```objc
NSMutableArray *x = [NSMutableArray arrayWithArray:@[@"1",@"2",@"3"]];
NSMutableArray *y = x;
[y addObject:@"4"];
NSLog(@"x=%@",x); //1,2,3,4
NSLog(@"y=%@",y); //1,2,3,4
```

在swift中 `Array`是以`struct`的形式存在的。并非OC里面的`class`
可能你会觉得这么多的复制会不会有性能上的缺点，实际上swift集合类型都使用的“写时复制”技术。 只有在复制的时候复制出来，其他时候都共享一个内部存储。  

## 4.5 数组的其他操作
swift中不建议我们直接使用下标去访问一个数组，如`array[3]`

```swift
var demoArray = ["🌰","🍎","🍐","🍇","🥚","🌽","🌺","I"]
```

1.迭代除第1个元素外的数组元素：`for x in array.dropFirst()`
2.迭代除最后5个元素外的数组元素：`for x in array.dropLast(5)`
3.(项目中最常用到的一个方法)所有元素和其下标: `for (idx, obj) in array.enumerated()`
4.寻找指定元素的位置 `if let idx = array.index {someMatchingLogic($0) }`

```swift
if let idx = demoArray.index(where: { (obj) -> Bool in
    if obj == "I"{
       return true
    }
    return false
}) {
    print("\(idx)")//7
}
5.所有元素进行变形 array.map {someTransformation($0)}
demoArray = demoArray.map { (obj) -> String in
    return "hi~\(obj)"
}
for obj in demoArray {
    print(obj)// hi~🌰...
}
```

6.筛选符合某个标准的元素 `array.filter {someCriteria($0)}`

```swift
demoArray = demoArray.filter { (obj) -> Bool in
    if obj == "🌰" || obj == "🍎" || obj == "I"{
        return true
    }else{
        return false
    }
}
print(demoArray)//["🌰", "🍎", "I"]
```

7.两个数组变形合并 `flatMap`

```swift
let fruit = ["🍎","🍐","🍌"]
let animal = ["🐷"]
    
let result = fruit.flatMap { (f) -> [String] in
    let newArray = animal.map({ (a) -> String in
        return (a+"eat"+f)
    })
    return newArray
}

print(result) //["🐷eat🍎", "🐷eat🍐", "🐷eat🍌"]
```

8.切片slice
获取某个范围中的元素，我们可以使用切片 

例如：获取除了第一个元素以外的元素集合

```swift
let fruit = ["🍎","🍐","🍌"]
let slice = fruit[1..<fruit.endIndex]
print(slice)//["🍐", "🍌"]
print("\(type(of: slice))")//ArraySlice<String>
```


我们得到的类型是ArraySlice 而不是Array，其实切片只是Array的一种表现形式。在开发过程中可以把它当做数组来看。 类型转换直接Array(ArraySlice)

# 5 字典
## 5.1 字典的定义
```swift
// 字典也用[]表示，编译器会自动区分[]中是一个个元素（数组）还是键值对（字典）
let dic : Dictionary<String , Any> = ["string" : "xx_cc", "age" : 18 , "height" : 1.88]// 与数组一样，同样可以对字典进行简写
let dic2 : [String : Any] = ["string" : "xx_cc", "age" : 18 , "height" : 1.88] // 推荐 这种写法更简便一些
//定义可变字典 var 修饰
var dicM = Dictionary <String ,Any> ()
var dicM1 = [String : Any]()
// 与数组一样，如果你用一致类型的字典字面量初始化字典，就不需要写出字典的类型了
var dicName = ["xx_cc":"xx","xx_cl":"cl"]
```

## 5.2 可变字典的基本操作
```swift
// 同数组一样字典也拥有count属性和isEmpty属性来得到字典的元素个数和快速判断字典元素个数是否为0
//给字典添加元素
dicM["name"] = "Tom"
dicM["age"] = 18
dicM["height"] = 1.88
// 删除元素
dicM.removeValue(forKey: "name") // 如果删除成功则返回被删除的值，如果字典没有这个键值对则返回nil
dicM.removeAll() // 我们也可以使用下标脚本语法给一个键赋值 nil来从字典当中移除一个键值对
dicM["name"] = nil
// 修改元素 字典会自动索引字典中没有相同的key，如果没有就添加，如果有就修改其值
dicM["name"] = "Tom"
// updateValue的功能同上，同样会增加或修改元素的值
// 如果updateValue是更新已经存在键的值，则会返回原来旧值的可选类型
// 如果updateValue为字典新增加了一个元素，则返回nil
let oldValue = dicM.updateValue("Jerry", forKey: "name")
oldValue //Tom
```


## 5.3 字典遍历
```swift
// 遍历字典中所有的key
for key in dic.keys {
    print(key)
}
// 遍历字典中所有的value
for value in dic.values {
    print(value)
}
// 遍历字典中所有的key - value
for (key,value) in dic{
    print(key, value)
}
// 拿到所有key 或value组成的数组
let keyArr = [String](dict.keys)
let valueArr = [String](dict.values)
// 我们可以通过遍历其中一个字典，为第二个字典赋值，来合并两个字典
let dicStr : [String : Any] = ["name" : "Tom" , "age" : 18]
var dicStr2 : [String : Any] = ["name" : "Jerry","height" : 1.88 , "phone" : "110"]
for (key , value) in dicStr {
    dicStr2[key] = value
}
```


## 5.4 字典的其他操作
### 5.4.1 字典的合并 merge
```swift
var dict = ["name":"Tom","age":"18"]
let newDict = ["name":"Jane","age":"19","gender":"M"]
dict.merge(newDict) { (dictValue, newDictValue) -> String in
    print(dictValue)    // Tom 相同key时候的dictValue
    print(newDictValue)     //Jane 相同key时候的newDictValue 
    return newDictValue //返回你觉得应该选择的value 我这里默认都是newDictValue
}
print(dict)["name": "Jane", "age": "19", "gender": "M"]
注：闭包里面的处理是逻辑是当两个dict 有相同的key return出我们觉得合适的value.
```

### 5.4.2 字典value的处理 mapValues
```swift
//字典的map方法
let mapDict = dict.mapValues { (value) -> String in
    return "new"+value
}
print(mapDict)//["name": "newTom", "age": "new18"]
```


这里的使用逻辑和数组中的map类似 不赘述。

# 6 集合
## 6.1 集合的定义
```swift
// 使用 Set<Element>创建并初始化一个集合
var letters = Set<Int>()
// 注意Set没有同数组一样对应的简写方式
// 也可以通过数组来创建集合
var name: Set<String> = ["cc", "xx", "xx_cc"]
6.2 集合的基本操作
// 通过count来访问集合内元素的个数
print(name.count)
// 也可以通过 isEmpty快速判断count属性是否为0
if name.isEmpty {
    print("As far as music goes, I'm not picky.")
}
// 通过insert为集合新增加一个元素
name.insert("enen")
// 删除集合中的元素
if let nameInfo = name.remove("cc") {
    print("\(nameInfo)")
}
// 如果集合中有cc这个元素那么就删除它，并且返回被删除的元素，如果没有就返回nil
// 我们这里使用 if let 来对返回的值进行判断，如果集合中存在被删除的参数，那么返回值不为nil，然后就会执行大括号里面的内容，如果集合中不存在该参数，那么就会返回nil，大括号中的内容就不会执行

// 使用contains()方法检查集合中是否包含了特定的元素
if name.contains("xx") {
    print("xx is in set")
}
```

使用 `intersection(_:)` 方法来创建一个只包含两个集合共有值的新合集。
使用 `symmetricDifference(_:)` 方法来创建一个只包含两个集合各自有的非共有值的新集合。
使用 `union(_:)`方法来创建一个包含两个集合所有值的新集合；
使用 `subtracting(_:)`方法来创建一个两个集合当中不包含某个集合值的新合集。

使用“相等”运算符 ( `==` )来判断两个集合是否包含有相同的值；
使用 `isSubset(of:)` 方法来确定一个集合的所有值是被某合集包含；
使用 `isSuperset(of:)`方法来确定一个集合是否包含某个合集的所有值；
使用 `isStrictSubset(of:)` 或者 `isStrictSuperset(of:)`方法来确定是个集合是否为某一个集合的子集或者超集，但并不相等；
使用 `isDisjoint(with:)`方法来判断两个集合是否拥有完全不同的值。

# 7 元组
元组是swift中独有的，OC没有对应的类型；元组定义的是一组数据类型，组成元组数据类型的可以称之为“元素”。而元组的使用，一般是用做于函数中的返回值。
## 7.1 元组的使用
```swift
let info = ("name", 18, 1.88)
// 取出元组中的各元素
info.0
info.1
info.2

// 取个别名
let info1 = (name : "wj", age : 18, height : 1.88)
info1.name
info1.age
info1.height
//书写格式类似字典的定义，但是这却有别于字典，首先是字典是用中括号进行括起来的，而元组是用小括号进行括起来的；其次就是字典的这个key一般用字符串，当然也可能用其他的数据类型，但是在元组中，这个别名没有特殊的要求，随便怎么写都是可以的，在用到info这个元组的时候直接用点语法就可以将别名显示出来，和最基本的写法的底层是一致的。

//对应元素
let (name, age, height) = ("wj", 18, 1.88)
name
age
height
```


# 8 可选型
可选型是Swift语言的特色之一，用于表达一个变量/常量可以为`nil`或者非`nil`值。可选类型其本质是一个枚举型，包含`none`和`some`两种类型。`Optional.none`就是`nil`, 非`nil`的原始值会通过`some(T)`包装，这也是为什么在使用`Optional`的时候要拆包的原因, 就是为了从`enum`里取出来原始值。
Swift中只有可选类型才能被赋值为`nil`，其他类型都不能赋值为`nil`
OC中当一个值不在使用时，我们可以将它赋值为0（基本数据类型）或者赋值为nil（对象类型），但是在Swift中，`nil`是一个特殊的类型，同`String`，`Int`相同。而Swift是一门强类型语言，类型不匹配无法赋值。所以只有可选类型才能被赋值为`nil`。被可选类型修饰的值则表示该值有可能为`nil`。

## 8.1 可选类型的定义
```swift
// 首先我们尝试给String变量赋值为nil编译器报错
// Nil cannot initialize specified type 'String'
// var name : String = nil

// 定义可选类型 Optional表示可选类型 泛型集合
var name : Optional<String> = nil
// 简写 String？表示可选类型的string 
var name1 : String? = nil
// 问号明确了它储存的值是一个可选项，意思就是说它可能包含某些 String  值，或者为nil。

// 给可选类型进行赋值
name1 = Optional("xx_cc") // 方式一
name1 = "xx_cc" // 方式二 编译器会自动加上 Optional()
```


## 8.2 解包和绑定
获取可选型内容需要加！解包，一般使用绑定。

```swift
var name : String? = nil
if let name = name {
    print(name)
}// 中间值采用就近原则，会使用定义比较近的那个name
```



### 8.2.1 可与 Bool 联合判断
```swift
if let obj = Optional , Bool {
    /// 前面有值且后面Bool为true执行
}
```


### 8.2.2 多 let 并列判断
```swift
if let obj1 = Optional1, let obj2 = Optional2, ....{
///当上面的let判断都有值的时候执行
}
```


## 8.3 空合运算符
空合运算符（nil coalecse）“a ?? b” 将对可选类型a进行空判断，如果a非nil就对其进行解包，否则就返回一个默认值b

```swift
var name: String? = "鹿晗"
var address: String? = nil
print((name ?? "XXX"),"来自", (address ?? "未知地区"))
// print结果为：鹿晗 来自 未知地区
```



## 8.4 可选链
可选链(optional chaining)为一种可以在当前值可能为`nil`的可选值上请求和调用属性、方法及下标的方法。如果可选值有值，那么调用就会成功；如果可选值是`nil`，那么调用将返回`nil`。多个调用可以连接在一起形成一个调用链，如果其中任何一个节点为`nil`，整个调用链都会失败，即返回`nil`。

```swift
let name = person.dog?.name?.lowercased()

var voidCallback:(()-> Void)?
    ///对于闭包调用的两种写法
    //❌不推荐
    if voidCallback != nil {
        voidCallback!()
    }    
    //✅ 推荐
    voidCallvack?()
```



## 8.5 可选值 map
```swift
///将一个网络图片加载出来的奇淫方法
    let urlString = "http://www.objc.io/logo.png"
    let view = URL(string: urlString)
        .flatMap { (url) -> Data? in
        try? Data(contentsOf: url)
        }
        .flatMap { (data) -> UIImage? in
            UIImage(data: data)
        }
        .map { (image) -> UIImageView in
            UIImageView(image: image)
    }
    

if let view = view {
    UIView().addSubview(view)
}
```

利用swift中的$0语法简化上面的代码

```swift
    let view2 = URL(string: urlString)
        .flatMap {
            try? Data(contentsOf: $0)
        }
        .flatMap {
            UIImage(data: $0)
        }
        .map {
            UIImageView(image: $0)
    }
    if let view2 = view2 {
        UIView().addSubview(view2)
    }
```


使用flatMap过滤nil
目的:我们想要求一个字符串数组中的数字和。

```swift
let numbers = ["1","2","3","4","add"]

var sum = 0
for case let i? in numbers.map({
    Int($0)
}) {
    sum += i// Int($0)为nil就不走这里了
}
//        sum的值为10

///当我们用?? 把nil替换成0
numbers.map { Int($0) }.reduce(0) { $0 + ($1 ?? 0)} //10

///在标准库中flatMap的作用可能正是你想要
numbers.flatMap { Int($0) }.reduce(0, +) // 10
```



## 8.6 强制解包的时机
几种强制解包的观点 1、绝不使用 2、代码逻辑更清晰的时候使用 3、不可避免的时候使用
我们通过特定的方法让可选值变成必选值，从而巧妙的避开强制解包。 可以先用filter去对序列进行排空处理，再通过map进行映射和排序。 如下面这个例子：

```swift
    let ages = ["Tom":17,"Jerry":16]
    //有强制解包
    ages.keys.filter { name in ages[name]! < 50 }.sorted()
    //巧妙的避开了强制解包
    ages.filter { (_, age) in age < 50 }
        .map { (name, _) in name }
        .sorted()
```



## 8.7 隐式可选值
定义：无论什么时候使用都会自动强制解包的可选值。变量或常量后加上!的都是隐式可选变量/常量。首先该变量或常量满足可选类型，其可被当成一般的变量/常量来使用，而不需要每次都验证是否有值。

出现场景一：
调用OC有返回值的方法，其返回值就是隐式可选值。

出现场景二：
隐式可选型主要用在一个变量/常量在定义瞬间完成之后值一定会存在的情况，例如在类的初始化过程中等。
