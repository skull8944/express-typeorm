// 【type】
// 利用interface跟type，設計出Employee、Manager、Engineer三種型別，
// 至少具有員工編號(number)、姓名(string)、部門(string)三個屬性，一個introduce的function讓員工可以自我介紹(console.log)
// 且Engineer必定有一個屬性可以指出他的Manager(type)

interface Employee {
  id: number;
  name: string;
  dep: string;
  introduce(): void;
}

interface Manager extends Employee {
  manager?: Employee;
}

interface Engineer extends Employee {
  manager: Employee;
}

const emp1: Employee = {
  id: 1,
  name: 'emp1',
  dep: 'EMP',
  introduce() {
    console.log(`我是 ${this.dep} 的 ${this.name}`);
  },
};
const emp2: Manager = {
  id: 2,
  name: 'manager2',
  dep: 'MANAGER',
  introduce() {
    console.log(`我是 ${this.dep} 的 ${this.name}`);
  },
};

const emp3: Engineer = {
  id: 3,
  name: 'enginerr3',
  dep: 'IT',
  manager: emp2,
  introduce() {
    console.log(`我是 ${this.dep} 的 ${this.name}`);
  },
};

emp1.introduce();
emp2.introduce();
emp3.introduce();

// 【tyepOrm】
// 依照上述type的作業中的Employee，設計出對應的orm entity，並練習使用
// migrate:generate
// migrate:up
// migrate:down
// 來創建table、練習CRUD的執行
