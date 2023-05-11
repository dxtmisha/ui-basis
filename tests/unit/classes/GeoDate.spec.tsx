import { GeoDate } from '../../../classes/GeoDate'
import { To } from '../../../classes/To'

describe('classes/GeoDate', () => {
  const second = 15
  const minute = 30
  const hour = 12
  const day = 11
  const month = 6
  const year = 2010

  const date = `${year}-0${month}-${day}T${hour}:${minute}:${second}`
  const item = new GeoDate(date)

  it('data', () => {
    expect(item.second.value).toBe(second)
    expect(item.minute.value).toBe(minute)
    expect(item.hour.value).toBe(hour)
    expect(item.day.value).toBe(day)
    expect(item.month.value).toBe(month)
    expect(item.year.value).toBe(year)
  })

  it('clone', () => {
    expect(item.clone().toString()).toBe(To.date(date).toString())

    expect(item.cloneClass().month.value).toBe(month)
    expect(item.cloneMonthNext().month.value).toBe(month + 1)
    expect(item.cloneMonthPrevious().month.value).toBe(month - 1)
    expect(item.cloneMonthStart().month.value).toBe(1)
    expect(item.cloneMonthEnd().month.value).toBe(12)

    expect(item.cloneWeekdayStart().day.value).toBe(6)
    expect(item.cloneWeekdayEnd().day.value).toBe(12)
    expect(item.cloneWeekdayNext().day.value).toBe(13)
    expect(item.cloneWeekdayPrevious().day.value).toBe(30)
    expect(item.cloneWeekdayFirst().day.value).toBe(30)
    expect(item.cloneWeekdayLast().day.value).toBe(3)

    expect(item.cloneDayNext().day.value).toBe(day + 1)
    expect(item.cloneDayPrevious().day.value).toBe(day - 1)
    expect(item.cloneDayStart().day.value).toBe(1)
    expect(item.cloneDayEnd().day.value).toBe(30)
  })

  it('get', () => {
    expect(item.getDate().getHours()).toBe(hour)
    expect(item.getMaxDay().value).toBe(30)
    expect(item.getFirstDayCode().value).toBe(0)
    expect(item.getHoursType().value).toBe('12')
    expect(item.getHour24()).toBe(false)
    expect(item.getTimeZoneOffset().value).toBe(-420)
    expect(item.getTimeZone().value).toBe('+07:00')

    expect(item.getYear()).toBe(year)
    expect(item.getMonth()).toBe(month)
    expect(item.getDay()).toBe(day)
    expect(item.getHour()).toBe(hour)
    expect(item.getMinute()).toBe(minute)
    expect(item.getSecond()).toBe(second)

    expect(item.getType()).toBe('date')
  })

  it('standard', () => {
    item.setType('datetime')
    expect(item.standard().value).toBe('2010-06-11T12:30:15+07:00')

    item.setType('date')
    expect(item.standard().value).toBe('2010-06-11')

    item.setType('month')
    expect(item.standard().value).toBe('2010-06')

    item.setType('time')
    expect(item.standard().value).toBe('12:30:15+07:00')
  })

  it('locale', () => {
    item.setType('datetime')
    expect(item.locale().value).toBe('Jun 11, 2010, 12:30 PM')

    item.setType('date')
    expect(item.locale().value).toBe('Jun 11, 2010')

    item.setType('month')
    expect(item.locale().value).toBe('Jun 2010')

    item.setType('time')
    expect(item.locale().value).toBe('12:30 PM')

    expect(item.localeSecond().value).toBe(second.toString())
    expect(item.localeMinute().value).toBe(minute.toString())
    expect(item.localeHour().value).toBe('12 PM')
    expect(item.localeDay().value).toBe(day.toString())
    expect(item.localeMonth().value).toBe('June')
    expect(item.localeYear().value).toBe(year.toString())
  })

  it('move', () => {
    item.setType('datetime')

    expect(item.moveByYear(1).getYear()).toBe(year + 1)
    expect(item.moveByYear(-2).getYear()).toBe(year - 1)
    expect(item.moveByYear(1).getYear()).toBe(year)

    expect(item.moveByMonth(1).getMonth()).toBe(month + 1)
    expect(item.moveByMonth(-2).getMonth()).toBe(month - 1)
    expect(item.moveByMonth(1).getMonth()).toBe(month)

    expect(item.moveByDay(1).getDay()).toBe(day + 1)
    expect(item.moveByDay(-2).getDay()).toBe(day - 1)
    expect(item.moveByDay(1).getDay()).toBe(day)

    expect(item.moveByHour(1).getHour()).toBe(hour + 1)
    expect(item.moveByHour(-2).getHour()).toBe(hour - 1)
    expect(item.moveByHour(1).getHour()).toBe(hour)

    expect(item.moveByMinute(1).getMinute()).toBe(minute + 1)
    expect(item.moveByMinute(-2).getMinute()).toBe(minute - 1)
    expect(item.moveByMinute(1).getMinute()).toBe(minute)

    expect(item.moveBySecond(1).getSecond()).toBe(second + 1)
    expect(item.moveBySecond(-2).getSecond()).toBe(second - 1)
    expect(item.moveBySecond(1).getSecond()).toBe(second)
  })

  it('set', () => {
    item.setType('datetime')

    expect(item.setYear(2000).getYear()).toBe(2000)
    expect(item.setMonth(3).getMonth()).toBe(3)
    expect(item.setDay(3).getDay()).toBe(3)
    expect(item.setHour(16).getHour()).toBe(16)
    expect(item.setMinute(3).getMinute()).toBe(3)
    expect(item.setSecond(3).getSecond()).toBe(3)

    expect(item.locale().value).toBe('Mar 03, 2000, 04:03 PM')

    item.setHour24(true)
    expect(item.locale().value).toBe('Mar 03, 2000, 16:03')

    item.setDate('1987-09-21 20:30:40')
    expect(item.locale().value).toBe('Sep 21, 1987, 20:30')
  })
})
