---
title: 感知机原理
tag: 感知机
categories:
  - 计算机笔记
  - 机器学习
typora-copy-images-to: upload
cover: >-
  https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403203237422.png
abbrlink: 1c66
date: 2024-12-23 23:22:12
---



# 感知机原理

感知机模型可以看作一个超平面：

$$
f(x) = \text{sigmoid}(wx+b)
$$
其中
$$
x \in \mathbb{R}^{n}, w \in \mathbb{R}^{n}, b \in \mathbb{R}
$$


当
$$
wx+b > 0
$$
时，模型将该样本分为正类

当
$$
wx+b \leq 0
$$
时，模型将该样本分为负类

感知器包括多个输入节点，从$x_{1}$到$x_{n}$，有多个权重矩阵$w_{0}$到$w_{n}$。一个输出节点$O$，激活函数使用sigmoid函数，最后输出的值为1或者-1。

## 学习策略

令$M$代表样本点被误分的集合。

所有的被误分类的点都满足：$$y_i(w \cdot x_i + b) < 0$$

损失函数为：$$L(w,b) = \sum_{x_i \in M} y_i (w \cdot x_i + b)$$

优化目标是损失最小化，含义为：最小化误分类点到决策面的距离！

## 学习算法

随机梯度下降算法（stochastic gradient descent）——每次选取一个被误分类的点，计算损失函数并进行参数更新。

计算梯度：

![image.png](https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403203237419.png)

参数更新：

![image-2.png](https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403203237420.png)

即：

![image-3.png](https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403203237421.png)


# 感知器规则解释

输入训练样本`X`和初始的权重矩阵`W`，将其进行向量的点乘，按后将求和的结果作用于激活函数`sigh()`，得到预测输出`O`，根据预测输出值和目标之间的差距`error`来调整权重向量`W`。

如此反复，直到`W`调整到合适的结果。

## 使用Python手动实现感知器模型

### 数据集

- **来源**：`sklearn`中的鸢尾花（iris）数据集
- **相关任务**：分类
- **实例的个数**：150个
- **特征的个数**：4个
- **有无缺失值**：无
- **摘要**：Famous database; from Fisher, 1936

### 数据集介绍

iris数据集是由Fisher在1936年整理，包含四个特征：

- **Speal.Length** (花萼长度)
- **Speal.Width** （花萼宽度）
- **Petal.Length** （花瓣长度）
- **Petal.Width** （花瓣宽度）

四个特征的类型都为浮点型，单位是厘米。

### 类别

类别共有三类：

- **Iris Setosa**（山鸢尾）
- **Iris Versicolour**（杂色鸢尾）
- **Iris Virginica**（维吉尼亚鸢尾）

### 实验说明

此次感知机实验在`Sklearn`的`Iris`数据集拿出两个类别，并以`[Speal.Length, Speal.Width]`作为特征。



```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
```


```python
class Perceptron():
    def __init__(self, input_dim):
        self.w = np.ones(input_dim, dtype=np.float32)
        self.b = 0
        self.l_rate = 0.1 # 学习率设为0.1
        self.epoch = 1000 # 训练的迭代次数epoch设为1000
    #定义符号函数
    def sign(self,x,w,b):
        y = np.dot(x, w) + b
        return y
    # 训练函数，使用训练数据x_train和标签y_train来训练感知器
    def fit(self,x_train,y_train):
        error_count=0
        wb = np.zeros((self.epoch, len(self.w) + 1))  # 存储每次迭代的权重和偏置
        for _ in range(self.epoch): # 迭代epoch次
            for i in range(len(x_train)):
                xi = x_train[i] # 当前样本的特征向量
                yi = y_train[i] # 当前样本的标签
                #如果当前节点分类错误
                if yi * self.sign(xi,self.w,self.b) <= 0:
                    self.w += self.l_rate * np.dot(xi,yi)
                    self.b += self.l_rate * yi
                    error_count += 1
            # print('w='+str(self.w)+',b='+str(self.b))
            wb[_] = np.concatenate([self.w, [self.b]])
        return wb
```


```python
def display(df,x_points,y_,wb):
    fig = plt.figure()
    ax1= fig.add_subplot(1,2,1)
    ax2 = fig.add_subplot(1,2,2)
    fig.tight_layout()  # 设置默认的间距
    #选取1-50作为第一类，50-100作为第二类
    ax1.scatter(df[:50]['sepal length'],df[:50]['sepal width'],color='blue',label='0')
    ax1.scatter(df[50:100]['sepal length'],df[50:100]['sepal width'],color='orange',label='1')
    ax1.set_xlabel('sepal length')
    ax1.set_ylabel('sepal width')
    ax1.legend()
    #可视化展示
    for i in range(len(wb)):
        if (i+1)%50 == 0:
            ax2.plot(x_points, -(wb[i][0] * x_points + wb[i][2]) / wb[i][1], color='green')  # 结果用绿色表示
    ax2.plot(x_points, y_, color='red')  # 最终结果用红色表示
    ax2.scatter(df[:50]['sepal length'],df[:50]['sepal width'], color='blue', label='0')
    ax2.scatter(df[50:100]['sepal length'],df[50:100]['sepal width'] , color='orange', label='1')
    ax2.set_xlabel('sepal length')
    ax2.set_ylabel('sepal width')
    ax2.legend()
    plt.show()
    
def load_data():
    # 加载iris数据集
    iris = load_iris()
    # 转换成df格式，然后将列名设置为对应的标签名
    df = pd.DataFrame(iris.data, columns=iris.feature_names)
    df['label'] = iris.target
    df.columns = ['sepal length', 'sepal width', 'petal length', 'petal width', 'label']
    # 为了方便可视化，只使用sepal length 和 sepal width作为特征
    return df
```


```python
#加载数据
df = load_data()
print(df)
```

         sepal length  sepal width  petal length  petal width  label
    0             5.1          3.5           1.4          0.2      0
    1             4.9          3.0           1.4          0.2      0
    2             4.7          3.2           1.3          0.2      0
    3             4.6          3.1           1.5          0.2      0
    4             5.0          3.6           1.4          0.2      0
    ..            ...          ...           ...          ...    ...
    145           6.7          3.0           5.2          2.3      2
    146           6.3          2.5           5.0          1.9      2
    147           6.5          3.0           5.2          2.0      2
    148           6.2          3.4           5.4          2.3      2
    149           5.9          3.0           5.1          1.8      2
    
    [150 rows x 5 columns]



```python
#选取前100个数据，选择的列为第0列，第1列，最后一列（标签）
data = np.array(df.iloc[:100,[0,1,-1]])
x,y = data[:,:-1],data[:,-1]
#对标签进行变换，由于感知机只能分类两类，输出值为1或-1，所以需要把0标签转换为-1
y = np.array([1 if label==1 else -1 for label in y])
perception =Perceptron()
wb=perception.fit(x,y)
print(wb)
```

    [[  0.23         0.34999996  -0.2       ]
     [  0.41999999   0.31999996  -0.2       ]
     [  0.61000001   0.28999996  -0.2       ]
     ...
     [  7.83007431 -10.01979733 -12.2       ]
     [  7.83007431 -10.01979733 -12.2       ]
     [  7.83007431 -10.01979733 -12.2       ]]



```python
# 可视化超平面
x_points = np.linspace(4, 7, 10)  # linspace返回固定间隔的数据
# 误差分类点到超平面的距离
y_ = -(perception.w[0] * x_points + perception.b) / perception.w[1]
display(df,x_points,y_,wb)

```


![png](https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403203237422.png)
​    

