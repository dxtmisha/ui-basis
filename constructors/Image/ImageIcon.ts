import { forEach } from '../../functions/data'

/**
 * Class for managing icons
 *
 * Класс для управления иконками
 */
export class ImageIcon {
  protected static readonly icons: Record<string, string> = {}

  /**
   * Returns the icon by the name
   *
   * Возвращает иконку по названию
   * @param index icon name / название иконки
   * @param url path to the storage location of the icon, if the icon does
   * not exist / путь к месту хранения иконки, если иконка не существует
   */
  static get (index: string, url = ''): string {
    return this.icons?.[index] || index.replace(/^@/, url || '/icons/') + '.svg'
  }

  /**
   * Adding custom icons
   *
   * Добавление пользовательских иконок
   * @param index icon name / название иконки
   * @param file path to the file / путь к файлу
   */
  static add (index: string, file: string): void {
    this.icons[`@${index}`] = file
  }

  /**
   * Adding an icon by the list
   *
   * Добавление иконки по списку
   * @param list список иконки
   */
  static addByList (list: Record<string, string>): void {
    forEach<string, string, void>(list, (file, index) => this.add(index, file))
  }
}
