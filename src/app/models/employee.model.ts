export class Employee {
    public id: string;
    public username: string;
    public password: string;
    public email: string;
    public phone: number;
    public department: string;
    public salary: number;
  
    constructor(id: string, username: string, password: string, email: string, phone: number, department: string, salary: number) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.email = email;
      this.phone = phone;
      this.department = department;
      this.salary = salary;
    }
  }
  