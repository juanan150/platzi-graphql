import { Avocado, Attributes, PrismaClient, Prisma } from '@prisma/client'

type ResolverContext = {
  orm: PrismaClient
}

type ArgType = {
  id: string
}

export function findAll(
  parent: unknown,
  { skip, take, where }: { skip?: number; take?: number, where: Prisma.AvocadoWhereInput },
  context: ResolverContext
): Promise<Avocado[]> {
  return context.orm.avocado.findMany({
    include: {
      attributes: true,
    },
    skip: skip || 0,
    take: take || 10,
    where,
  })
}

export function findOne(
  parent: unknown,
  { id }: ArgType,
  context: ResolverContext
): Promise<Avocado | null> {
  return context.orm.avocado.findUnique({
    where: { id: parseInt(id) },
    include: {
      attributes: true,
    },
  })
}

export const resolver: Record<
  keyof (Avocado & { attributes: Attributes }),
  (parent: Avocado & { attributes: Attributes }) => unknown
> = {
  createdAt: (parent) => parent.createdAt,
  updatedAt: (parent) => parent.updatedAt,
  deletedAt: (parent) => parent.deletedAt,
  id: (parent) => parent.id,
  sku: (parent) => parent.sku,
  name: (parent) => parent.name,
  price: (parent) => parent.price,
  image: (parent) => parent.image,
  attributes: (parent) => ({
    description: parent.attributes.description,
    shape: parent.attributes.shape,
    hardiness: parent.attributes.hardiness,
    taste: parent.attributes.taste,
  }),
}

export function createAvo(
  parent: unknown,
  {
    data,
  }: { data: Pick<Avocado, 'name' | 'price' | 'image' | 'sku'> & Attributes },
  context: ResolverContext
): Promise<Avocado> {
  const { name, price, image, sku, ...attributes } = data

  console.log(attributes)

  return context.orm.avocado.create({
    data: {
      name,
      price,
      image,
      sku,
      attributes: {
        create: {
          ...attributes,
        },
      },
    },
  })
}
