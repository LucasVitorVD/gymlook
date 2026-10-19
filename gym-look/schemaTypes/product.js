export const product = {
  name: 'product',
  title: 'Produto',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome do produto',
      type: 'string',
      validation: (Rule) => Rule.required().error('O nome do produto é obrigatório'),
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Blusas', value: 'blusas' },
          { title: 'Conjuntos', value: 'conjuntos' },
          { title: 'Macacões', value: 'macacoes' },
          { title: 'Tops', value: 'tops' },
          { title: 'Shorts', value: 'shorts' },
          { title: 'Acessórios', value: 'acessorios' },
        ],
      },
      validation: (Rule) => Rule.required().error('Selecione uma categoria'),
    },
    {
      name: 'type',
      title: 'Tipo (ex: Blusa Cropped, Conjunto Top+Legging)',
      type: 'string',
      validation: (Rule) => Rule.required().error('Informe o tipo do produto'),
    },
    {
      name: 'price',
      title: 'Preço',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .error('O preço é obrigatório')
          .regex(/^\d+([.,]\d+)?$/, { name: 'preço numérico' })
          .error('Use apenas números (ex: 50,00 ou 50.00)'),
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().error('A descrição é obrigatória'),
    },
    {
      name: 'colors',
      title: 'Cores disponíveis',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'colorItem',
          title: 'Cor',
          fields: [
            { name: 'name', title: 'Nome da cor', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'hex', title: 'Código da cor (ex: #000000)', type: 'string', validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Use o formato hexadecimal com # (ex: #000000)') },
          ],
          preview: {
            select: { title: 'name', subtitle: 'hex' },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).error('Cadastre pelo menos uma cor'),
    },
    {
      name: 'images',
      title: 'Fotos por cor',
      description: 'Envie uma foto para cada cor cadastrada acima',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'colorImage',
          title: 'Foto',
          fields: [
            {
              name: 'colorName',
              title: 'Nome da cor (deve ser igual ao cadastrado acima)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            { name: 'image', title: 'Imagem', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { title: 'colorName', media: 'image' },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).error('Cadastre pelo menos uma foto'),
    },
    {
      name: 'sizes',
      title: 'Tamanhos disponíveis',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['U', 'M', 'G'] },
      validation: (Rule) => Rule.required().min(1).error('Selecione pelo menos um tamanho'),
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category' },
  },
};
