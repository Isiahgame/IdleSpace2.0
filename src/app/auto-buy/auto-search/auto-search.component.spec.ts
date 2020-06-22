import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AutoSearchComponent } from "./auto-search.component";
import { testImports } from "src/app/app.component.spec";
import { FormatPipe } from "src/app/format.pipe";
import { MainService } from "src/app/main.service";
import { OptionsService } from "src/app/options.service";

describe("AutoSearchComponent", () => {
  let component: AutoSearchComponent;
  let fixture: ComponentFixture<AutoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: testImports,
      declarations: [AutoSearchComponent, FormatPipe],
      providers: [MainService, OptionsService, FormatPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
