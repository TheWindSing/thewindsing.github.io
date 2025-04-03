---
title: C++中的IO
tag: C++
categories: 
- 计算机笔记
date: 2024-01-12 23:55:33
description: 介绍了C++中的输入输出（IO）操作，包括流的概念、格式化输入输出、文件流操作（文本文件和二进制文件）、随机文件访问，以及自定义I/O操作符的方法，涵盖了从基础到高级的文件处理技术。
cover: https://cdn.jsdelivr.net/gh/TheWindSing/picgo-image-bed/BlogImg/20250403212900242.png
abbrlink: 75c2
---

## 摘要

介绍了C++中的输入输出（IO）操作，包括流的概念、格式化输入输出、文件流操作（文本文件和二进制文件）、随机文件访问，以及自定义I/O操作符的方法，涵盖了从基础到高级的文件处理技术。

## 目录

[TOC]

## C++ I/O流及流类库

### 流

#### 流的概念

* 输入/输出操作可以看作是数据的有向流动，即数据从一个设备（源）流向另一个设备（目标） 
* 流实际上是一种对象，它在使用前被建立，使用后被删除。数据的输入/输出操作就是从流中提取数据或者向流中添加数据
* 通常把从流中提取数据的操作称为析取，即读操作；向流中添加数据的操作称为插入操作，即写操作。
* 完成输入/输出操作的类称为流类
* 众多流类组成流类库，C++中利用继承组织流类库的类层次
* 

### C++预定义I/O对象

| **对 象  定 义**   | **说  明**                                     |
| ------------------ | ---------------------------------------------- |
| **ostream cout;**  | **cout**与标准输出设备相关联                   |
| **ostream  cerr;** | **cerr**与标准错误输出设备相关联（非缓冲方式） |
| **ostream  clog;** | **clog**与标准错误输出设备相关联（缓冲方式）   |
| **istream cin;**   | **与标准输入设备相关联**                       |

## 格式化输入/输出

### 采用ios成员函数

#### ios中的数据格式化标志字

```cpp
long x_flags; //格式化标识字
```

#### ios中的格式化标志

ios::skipws		跳过输入流中的空白字符
ios::left			输出数据按左对齐，如[12      ]
ios::right		输出数据按右对齐，如[      12]
ios::dec			按十进制数据输出
ios::oct			按八进制数据输出
ios::hex			按十六进制数据输出
ios::showbase	在输出数据前面显示基数（八进制是0，十六进制是0x）
ios::showpoint	浮点数输出带小数点
ios::uppercase	大写字母输出十六进制数（即ABCDEF，默认是小写）
ios::showpos	在正数前加“+”
ios::scientific	用科学计数法输出浮点数，如[2.122E2]
ios::fixed	用定点数形式输出浮点数，如[212.2]
ios::unitbuf	完成后立即刷新缓冲区

#### ios中的格式化成员函数

setf(flags)	      设置指定的格式化标志flags
unsetf(flags)     取消指定的格式化标志flags
setf(flags,filed)  先清除、然后设置标志
flags可以是前面列举的格式化标志符
long flags()  返回x_flags的值，获取当前格式标志的状态

#### ios中的其他控制字及函数

int x_percision	设置浮点数的输出精度
int x_width 	设置输出数据的字段宽度
char x_fill	设置输出的填充字符
int width(int len);
char fill(char ch);
int percision(int num);

ch=fill()		
返回填充字符（默认为空格），ch是一个字符变量
fill(ch)		
设置填充字符，ch是要设置为填充的字符
p=precision()	
获取当前浮点数的精度，p是一个整型变量
precision(p)	
设置精度，p是一个整数，代表要设置的数字位数
w=width()	
获取当前字段宽度（字符个数），w是整型变量
width(w)	
设置当前字段宽度，w是代表设置输出宽度的整数

#### 例

```cpp
#include<iostream>
using namespace std;
void main(){
    char c[30]="this is string";
    double d=-1234.8976;
    cout.width(30);    
    cout.fill('*');
    cout.setf(ios::left);
    cout<<c<<"----L1"<<endl;
    
    cout.width(30);
    cout.setf(ios::right);
    cout<<c<<"----L2"<<endl; 
     cout.setf(ios::dec|ios::showbase|ios::showpoint);
    cout.width(30);
    cout<<d<<"----L3"<<"\n";
    cout.setf(ios::showpoint);
    cout.precision(10);
    cout.width(30);
    cout<<d<<"----L4"<<"\n";
    cout.width(30);
    cout.setf(ios::oct,ios::basefield);
    cout<<100<<"----L5"<<"\n";
   }
```

### 利用操作符

C++流类库中的每个流对象都维护着一个格式状态，它控制着数据格式化操作的细节。如输出数据的基数（默认为十进制数据）、对齐方式、精度等。

C++还提供了一组可以对数据进行格式化的预定义操纵符（也称操纵算子） 

#### C++流类中的操纵符

showbase（noshowbase）   显示（不显示）数值的基数前缀
showpoint（noshowpoint）显示小数点（存在小数部分时才显示小数点）
showpos（noshowpos）	在非负数中显示（不显示）+
skipws（noskips）	输入数据时，跳过（不跳过）空白字符
uppercase(nouppercase)	十六进制显示为0X（0x），科学计数法显示E(e)
dec /oct / hex		十进制/八进制/十六进制
left/right		设置数据输出对齐方式为：左/右 对齐
fixed			以小数形式显示浮点数
scientitific		用科学计数法显示浮点数
flush			刷新输出缓冲区
ends			插入空白字符，然后刷新ostream缓冲区
endl			插入换行字符，然后刷新ostream缓冲区
ws				跳过开始的空白

#### 头文件\<iomanip>或<iomanip.h>中的操纵符函数

setfill(ch)	设置ch为填充字符
setprecision(n)	设置精度为n位有效数字
setw(w)	设置数据的输出宽度为w个字符
setbase(b)	基数设置为b（b=8，16等）进制

#### 例

```cpp
#include<iostream>
#include<iomanip>
using namespace std;
void main(){
    char c[30]="this is string";
    double d=-1234.8976;
    cout<<setw(30)<<left<<setfill('*')<<c<<"----L1"<<endl;
    cout<<setw(30)<<right<<setfill('*')<<c<<"----L2"<<endl;
    cout<<dec<<showbase<<showpoint<<setw(30)<<d<<"----L3"<<"\n";
    cout<<setw(30)<<showpoint<<setprecision(10)<<d<<"----L4"<<"\n";
    cout<<setw(30)<<setbase(8)<<100<<"----L5"<<"\n";
}
```

### 常用成员函数I/O

#### 常用的几个istream的成员函数

int get( ) // 从输入流中输入一个字符，并返回该字符作为函数的返回值；遇到文件结束符，返回EOF
int get(char &c)
istream& get(char * c, int n,char a='\n') 

istream& getline(char* c,int n,char a='\n');

istream& read(char *c, int n)
 将指定数量的字符输入到字符数组中
int gcount()  
统计最后一次输入操作读取的字符数
istream& ignore(int =1,int =EOF) 
读取和删除指定数量的字符，或遇到终止符提前结束
istream& pushback(char) 
把字符放入到输入流中
int peek() 
预读输入流中的下一个字符，但不删除

```cpp
// 用函数get和getline读取数据。
#include <iostream>
using namespace std;
void main(){
char c,char a[50],char s1[100];
cout<<"use get() input char: ";
while((c=cin.get())!='\n')			//L1
cout<<c;
cout<<endl;
cout<<"use get(a,10) input char: ";
cin.get(a,10); 					//L2
cout<<a<<endl;
cin.ignore(1);					//L3
cout<<"use getline(s1,10) input char: ";
cin.getline(s1,10);				//L4
cout<<s1<<endl;
}
```

#### 常用的几个ostream成员函数

ostream& put(char c)  输出字符
ostream& write(const char *c,int n); 将字符串中的内容输出
ostream& flush(); 清空缓存

```cpp
// 用get读取数据，用put及write 输出数据的例子
#include<iostream>
using namespace std;
void main(){
char c;
char a[50]="this is a string...";
cout<<"use get() input char: ";
while((c=cin.get())!='\n') 	//L1  用get读取字符，遇回车键结束
cout.put(c); 		//L2  将c中的字符输出
cout.put('\n');		//L3  输出一个回车换行符
cout.put('t').put('h').put('i').put('s').put('\n');  //L4  输出this
cout.write(a,sizeof(a)-1).put('\n');//L5  write一次输出多个字符
cout<<"look"<<"\t here! "<<endl;
}
```

## 自定义I/O操作

### 自定义输入/输出操作符

#### 输入操作符

```cpp
istream& 操作符名字(istream& stream)
{
  ….;
  return stream;
}
```

#### 输出操作符

```cpp
ostream& 操作符名字(ostream& stream)
{
  ….;
  return stream;
}
```

### 例子

```cpp
#include <iostream>
istream& prompt(istream& stream)
{
	cout<<"请输入十六进制数:";
	cin>>hex;
	return stream;
}
int main()
{
	int i;
	cin>>prompt>>i;
	cout<<i<<endl;
    return 0;
}
```

```cpp
#include <iostream>
#include <iomanip>
ostream& dollar_format(ostream& stream)
{
	stream.setf(ios::left);
	stream<<setw(12)<<
     setprecision(4)<<setfill('$');
	return stream;
}
int main()
{
	cout<<"["<<123.4567<<"]“
     <<endl;
	cout<<"["<<dollar_format<<123.4567<<"]"<<endl;
    return 0;
}
```

## 文件流

### 文件的概念

文件是存储在存储介质上（如磁盘、磁带、光盘）的数据集合。
**文件的类型**

* 文本文件:
  文本文件在磁盘上存放相关字符的ASCII码，所以又称为ASCII文件。
* 二进制文件:
  二进制文件在磁盘上存储相关数据的二进制编码，它是把内存中的数据，按其在内存中的存储形式原样写到磁盘上而形成的文件。

C++将文件看成是一个个字符在磁盘上的有序集合，用流来实现文件的读写操作 。
**与文件相关的流**：ifstream、ofstream、fstream 

### 文件与文件系统

#### 文件（File）

- 可以将文件视为I/O对象
- 在文件和某个外设间建立关联，将文件作为I/O设备的抽象描述，屏蔽外设之间的差异
- 文件缓冲：缓冲机制
- 文件操作步骤：(1) 打开(2)读/写(3)关闭

#### 文件系统（FS，File System）

* FS提供一系列系统调用接口来实现程序和外设之间的交互

### 用流操作文件的步骤

* （1）建立文件流
  * ifstream iFile;
  * ofstream oFile; 
  * fstream ioFile; 
* （2）打开文件 
  * void open(const char *filename,int mode,int access);
* （3）访问文件
* （4）关闭文件
  * iFile.close();
  * oFile.close();

### 打开文件的方式

| **文件打开方式**   | **说  明**                                                   |
| ------------------ | ------------------------------------------------------------ |
| **ios::in**        | **以输入方式打开文件，即读文件（**ifstream**类对象默认方式）** |
| **ios::out**       | **以输出方式打开文件，即写文件（**ofstream**类对象默认方式）** |
| **ios::app**       | **以添加方式打开文件，新增加的内容添加在文件尾**             |
| **ios::ate**       | **以添加方式打开文件，新增加的内容添加在文件尾，但下次添加时则添加在当前位置** |
| **ios::trunc**     | **如文件存在就打开并清除其内容，如不存在就建立新文件**       |
| **ios::binary**    | **以二进制方式打开文件（默认为文本文件）**                   |
| **ios::nocreate**  | **打开已有文件，若文件不存在，则打开失败**                   |
| **ios::noreplace** | **若打开的文件已经存在，则打开失败**                         |

### 文件访问模式

filebuf::openport  共享方式
filebuf::sh_none   独占方式，不允许共享
filebuf::sh_read	    允许读共享
filebuf::sh_write   允许写共享

### 例子

```txt
假设有学生的chinese、math、computer成绩表如下：
张三，76，98，67；李四，89，70，60；
王十，91，88，77；黄二，62，81，75；
刘六，90，78，67
   用fstream文件流在目录C:\dk下建立a.dat文件，并将上述学生成绩写入文件中。然后以二进制方式打开建立的文件，读出文件中的数据，计算每个学生的总成绩并将它显示在屏幕上。
```

```cpp
#include <iostream>
#include <fstream>
using namespace std;

void main()
{
    fstream  ioFile;										
    ioFile.open("C:\\dk\\a.dat",ios::out);				
    ioFile<<"张三"<<"  "<<76<<" "<<98<<" "<<67<<endl;	   //L3
    ioFile<<"李四"<<"  "<<89<<" "<<70<<" "<<60<<endl;
    ioFile<<"王十"<<"  "<<91<<" "<<88<<" "<<77<<endl;
    ioFile<<"黄二"<<"  "<<62<<" "<<81<<" "<<75<<endl;
    ioFile<<"刘六"<<"  "<<90<<" "<<78<<" "<<67<<endl;
    ioFile.close();	
     ioFile.open("C:\\dk\\a.dat",ios::in|ios::binary);	//L5
    char name[10];
    int chinese,math,computer;
    cout<<"姓名\t"<<"英语\t"<<"数学\t"<<"计算机\t"<<"总分"<<endl; 
    ioFile>>name;										
    while(!ioFile.eof())	{								
        ioFile>>chinese>>math>>computer;	
        cout<<name<<"\t"<<chinese<<"\t"<<math<<"\t“
               <<computer<<"\t"
               <<chinese+math+computer<<endl;		
        ioFile>>name;
    }
    ioFile.close();						
}
```

## 二进制文件

### 二进制文件与文本文件的区别

在读文件时，它们判定文件结束标志的方法存在区别。在读文本文件的过程中，当get 之类的成员函数遇到文件结束符时，它返回常量EOF作为文件结束标志，但二进制文件不能用EOF作为文件结束的判定值。因为EOF的值是1，若文件中某个字节的值为1，就会被误认为是文件结束符。C++提供了一个成员函数eof来解决这个问题，它的用法如下：
int xx::eof()
其中，xx代表输入流对象，到达文件末尾时，返回一个非0值，否则返回0。

### 二进制文件操作方法

get和put按字节方式读写文件数据
istream& get(char& ch);
ostream& put(char& ch);
read和write按数据块方式读写文件数据
istream& read(char* ch, int n);
ostream & write(char* ch, int n);

### 例子

```txt
用二进制方式建立一个磁盘文件，将ASCII 编码为0～90之间的字符写入到文件C:\dk\a.dat中，然后用二进制文件方式读出并在屏幕上显示a.dat的内容。
```

```cpp
#include <iostream>
#include <fstream>
using namespace std;
void main(){
    char ch;
    ofstream out("C:\\dk\\a.dat",ios::out|ios::binary);		//L1
    for(int i=0;i<90;i++){
        if(!(i % 30))
		out.put('\n');							out.put(char(i));						out.put(' ');						
		}
    out.close();							    ifstream in("C:\\dk\\a.dat",ios::in|ios::binary);		//L6
    while(in.get(ch))
		cout<<ch;				
	in.close();							
}
```

将一批数据以二进制形式存放在磁盘文件中:

```cpp
#include <iostream>
#include <fstream>
using namespace std;
struct student
{char name[20];
int num;
int age;
char sex;
};
int main()
{
student stud[3]={"li",1001,18,'f',"fun",1002,19,'m',"wang",1004,17,'f'};
ofstream outfile("stud.dat",ios::binary);
if(! outfile)
{
    cerr<<"open error!"<<endl;
	abort();
}
for(int i=0;i<3;i++)
outfile.write((char*)&stud[i],sizeof(stud[i]));
outfile.close();
return 0;
}
```

将文件数据读入并显示：

```cpp
#include <iostream>
#include <fstream>
using namespace std;
struct student
{
    char name[20];
    int num;
    int age;
    char sex;
};
int main()
{
    student stud[3];
    int i;
    ifstream infile("stud.dat",ios::binary);
    if(! infile)
    {
        cerr<<"open error!"<<endl;
        abort();
    }
    for(i=0;i<3;i++)
    infile.read((char*)&stud[i], sizeof(stud[i]));
    infile.close();
    for(i=0;i<3;i++)
    {
        cout<<"NO"<<i+1<<endl;
        cout<<"name:"<<stud[i].name<<endl;
        cout<<"num:"<<stud[i].num<<endl;
        cout<<"age:"<<stud[i].age<<endl;
        cout<<"sex:"<<stud[i].sex<<endl;
    }
return 0;
}
```

## 随机文件

### 顺序文件与随机文件

顺序访问是指按照从前到后的顺序依次对文件进行读写操作，有些存储设备只支持顺序访问，如磁带
随机访问也称为直接访问，可以按任意次序对文件进行读写操作 

### 随机文件访问方式

对于随机文件，C++流类提供了一个操作它的的文件指针，该指针可在文件中移动，将它指向要读写的字节位置，然后从该位置读取或写入指定字节数的数据块，这样就实现了文件数据的随机访问。

### 定位输入文件读指针的成员函数

istream& seekg(long pos);			
istream& seekg(long off, dir);		
long tellg(); 

### 定位输出文件写指针的成员函数

ostream& seekp(long pos); 
ostream& seekp(long off, dir);
long tellp();

### 例子

```txt
某雇员类Employee有编号、姓名、年龄、工资等数据成员。设计一个随机文件保存各雇员的各项数据。
```

 ```cpp
#include <iostream>
#include <string>
#include <fstream>
using namespace std;
class Employee
{
private:
    int number ,age;
    char name[20];
    double sal;
public:
    Employee(){}
    Employee(int num,char* Name,int Age, double Salary){
        number=num;
        strcpy(name,Name);
        age=Age;
        sal=Salary;
    }
    void display(){
      cout<<number<<"\t"<<name<<"\t"<<age<<"\t"<<sal<<endl;
    }
};
int main()
{
    ofstream out("Employee.dat",ios::out|ios::binary);	//定义随机输出文件
    Employee e1(1,"张三",23,2320);
    Employee e2(2,"李四",32,3210);
    Employee e3(3,"王五",34,2220);
    Employee e4(4,"刘六",27,1220);
   //按e1,e2,e3,e4顺序写入文件
    out.write((char*)&e1,sizeof(e1)); 
    out.write((char*)&e2,sizeof(e2));
    out.write((char*)&e3,sizeof(e3));
    out.write((char*)&e4,sizeof(e4));
     //下面的代码将e3（即王五）的年龄改为40岁   
    Employee e5(3,"王五",40,2220);
    out.seekp(2*sizeof(e1));		//指针定位到第3（起始为0）个数据块
    out.write((char*)&e5,sizeof(e5)); //将e5写到第3个数据块位置，覆盖e3
    out.close();			//关闭文件
        ifstream in("Employee.dat",ios::in|ios::binary); 
    Employee s1; //s1用于保存从文件中读出的数据
    cout<<"\n-------从文件中读出第3个人的数据-----\n\n";
    in.seekg(2*(sizeof(s1)),ios::beg)； //文件指针定位到第3个数据块
    in.read((char*)&s1,sizeof(s1));	    //读出第3个雇员的数据块
    s1.display();
    cout<<"\n---------从文件中读出全部的数据------\n\n";
    in.seekg(0,ios::beg);                   //移动文件指针，指向文件开头
    in.read((char*)&s1,sizeof(s1)); 	      //读出第1个数据块
    while(!in.eof())
    {		      //如果没有读完文件，就继续读
        s1.display();				//显示读出的雇员数据
        in.read((char*)&s1,sizeof(s1));//读当前文件指针处的数据
    }
	return 0;
}
 ```

