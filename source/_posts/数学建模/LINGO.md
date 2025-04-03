---
title: LINGO
tags:
  - CUMCM
categories:
  - 计算机笔记
  - 数学建模
description: description
abbrlink: aad3
date: 2024-08-26 12:03:01
---
# LINGO

## 在VScode使用

 [如何在 VSCode 中配置和编写 LINGO (cnblogs.com)](https://www.cnblogs.com/BOXonline1396529/p/18155695) 



## 段

LINGO中建立的优化模型可以由六个部分组成，或称为六“段”。

1. 集合段：用于定义数组型性变量
   SETS:.....ENDSETS
2. 数据段：用于变量赋值与数据传递
   DATA:......ENDDATA
3. 目标与约束段：用于列出目标与约束
   唯一一个**没有**段的开始和结束标记
4. 计算段：用于数据初始整理计算
   CALC:.....ENDCALC
5. 初始段：用于变量赋初值迭代寻优
   INIT:......ENDINIT
6. 子模型段：用于表达子模型进行调用
   @SUBMODEL mymodel:
   可执行语句(约束+目标)
   ENDSUBMODEL

## 逻辑运算符和过滤条件

### 9种逻辑运算符

可以分成两类：
#AND#（与），#OR#（或），#NOT#（非）：
#EQ#（等于），#NE#（不等于），
#GT#（大于），#GE#（大于等于），
#LT#（小于），#LE#（小于等于）

> 　逻辑表达式和关系表达式不同，可以为假，返回０

### `@if()`语句   

#### 表达式

```lg4
@IF(logical_condition,true_result,false_result);
```

当逻辑表达式`logical_condition`的结果为真时，返回`true_result`,否则返回`false_result`。

#### 例子

用`@if()`语句表示分段函数

$$
f\left( x \right) =\left\{ \begin{array}{l}
	\begin{matrix}
	4x&		0\le x\le 500\\
\end{matrix}\\
	\begin{matrix}
	500+3x&		500<x\le 1000\\
\end{matrix}\\
	\begin{matrix}
	1500+2x&		x>1000\\
\end{matrix}\\
\end{array} \right. 
$$

```lg4
f=@IF(X#LE#500,4*X,@IF(X#LE#1000,500+3*X,1500+2*X);
```

## 线性规划模型

### 问题

 有两个粮库A1,A2,向三个粮站B1,B2,B3,调运大米,两个粮库现存大米分别为4吨，8吨，三个粮站至少需要大米分别为2,4,5吨，两个粮库到三个粮站的距离（单位:公里）如下，问如何调运使运费最低。

用X表示运量

![1724656204287](LINGO.assets/1724656204287.png)

### 模型

![1724656366236](LINGO.assets/1724656366236.png)

### 程序

```lg4
MODEL:
TITLE:调运大米的运输问题程序3;
!定义集合段：
SETS:
LIANGKU/1..2/:A;!定义粮库的集合：
LIANGZHAN/1..3/:B;I定义粮站的集合：
YULIANG (LIANGKU,LIANGZHAN):X,C;
ENDSETS
DATA:
!粮库到粮站的距离：
C=
12 24 8
30 12 24
!粮库的限量：
A=4 8;
!粮站的限量：
B=2 4 5;
ENDDATA
MIN=GSUM(YULIANG:C*X)
!粮库上限的约束：
GFOR(LIANGKU(I):
@SUM(LIANGZHAN(J):X(I,J))<A(I))
!粮站下限的约束：
CFOR (LIANGZHAN (J):
@SUM(LIANGKU(I):X(I,J))>B(J));
END
```



