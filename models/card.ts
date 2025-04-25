/*
 * Copyright (c) 2014-2025 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

/* jslint node: true */
import {
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  DataTypes,
  type CreationOptional,
  type Sequelize
} from 'sequelize'
class Card extends Model<
InferAttributes<Card>,
InferCreationAttributes<Card>
> {
  declare UserId: number
  declare id: CreationOptional<number>
  declare fullName: string
  declare cardNum: number
  declare expMonth: number
  declare expYear: number
}

const CardModelInit = (sequelize: Sequelize) => {
  Card.init(
    {
      UserId: {
        type: DataTypes.INTEGER
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fullName: DataTypes.STRING,
      cardNum: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: true,
          len: [16, 16] // as per old 1000 0000 0000 0000 – 9999 9999 9999 9999
        }
      },
      expMonth: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          min: 1,
          max: 12
        }
      },
      expYear: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          min: 2080,
          max: 2099
        }
      }
    },
    {
      tableName: 'Cards',
      sequelize
    }
  )
}

export { Card as CardModel, CardModelInit }
