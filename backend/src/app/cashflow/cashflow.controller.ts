import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CashflowService } from './cashflow.service';
import { CreateCashflowDto } from './dto/create-cashflow.dto';
import { UpdateCashflowDto } from './dto/update-cashflow.dto';
import { AdvancedSecurity } from '@/src/shared/decorators/security.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cashflows')
@Controller('cashflows')
@AdvancedSecurity()
export class CashflowController {
    constructor(private readonly cashflowService: CashflowService) {}

    @Post()
    create(@Body() createCashflowDto: CreateCashflowDto) {
        return this.cashflowService.create(createCashflowDto);
    }

    @Get()
    findAll() {
        return this.cashflowService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cashflowService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCashflowDto: UpdateCashflowDto,
    ) {
        return this.cashflowService.update(id, updateCashflowDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cashflowService.remove(+id);
    }
}
