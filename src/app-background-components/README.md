Здесь находятся компоненты которые будут висеть на фоне всегда. Это ресурсозатратные компоненты, которые могут приводить к фризам при повторных рендерах. Управляются они через анимации, например когда нужно показать какой-то компонент, то меняем свойства анимационного стиля, не нагружая JS поток. 