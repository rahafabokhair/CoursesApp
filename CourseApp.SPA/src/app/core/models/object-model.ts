export class User {
  constructor(
    public username: string,
    public gender: string,
    public photoURL: string,
    public password: string,
    public dateOfBirth: string,
    public ClassOrderId: number,
    public id?: number
  ) {}
}

export class ClassOrder {
  constructor(public name: string, public id?: number) {}
}
export class CourseCategory {
  constructor(public name: string, public id: number) {}
}

export class Courses {
  constructor(
    public name: string,
    public studentAgeFrom: number,
    public studentAgeTo: number,
    public level: string,
    public description: string,
    public seatsNumber: number,
    public photoUrl: string,
    public price: string,
    public lessonDuration: string,
    public lessonNumber: string,
    public duration: string,
    public license: string,
    public courseCategoryId: number,
    public teacherName: string,
    public startDate: Date,
    public endDate: Date,
    public schedules:Schedule[],
    public id: number
  ) {}
}
export class  Schedule{
  constructor(
    public day: string,
    public startTime: string,
    public endTime: string
  ) {}
}
