import { ClickOutsideModalDirective } from './click-outside-modal.directive';
import { ElementRef } from '@angular/core';

describe('ClickOutsideModalDirective', () => {
  let directive: ClickOutsideModalDirective;
  let mockElementRef: ElementRef;

  beforeEach(() => {
    // Crea un mock per ElementRef
    mockElementRef = new ElementRef(document.createElement('div'));
    directive = new ClickOutsideModalDirective(mockElementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should emit clickOutside when clicking outside the element', () => {
    const spy = spyOn(directive.clickOutside, 'emit');
    // Simula un click fuori dall'elemento
    directive.onClick(document.createElement('div'));
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit clickOutside when clicking inside the element', () => {
    const spy = spyOn(directive.clickOutside, 'emit');
    // Simula un click dentro l'elemento
    directive.onClick(mockElementRef.nativeElement);
    expect(spy).not.toHaveBeenCalled();
  });
});

/** Le problème dans le fichier de test est que ClickOutsideModalDirective nécessite une instance d'ElementRef pour fonctionner correctement. 
 * Dans votre test, cependant, vous créez une instance de la directive sans passer d'ElementRef, ce qui cause une erreur.
 * 
 * => POURQUOI CELA SE PRODUIT-IL ? 
 * La directive dépend d'un objet ElementRef qu'Angular fournit automatiquement dans le contexte d'une application réelle. Dans les tests, cette dépendance n'est pas injectée automatiquement, il faut donc la simuler.
 * 
 * => SOLUTION 
 * Vous pouvez résoudre le problème en fournissant manuellement un mock d'ElementRef. Vous trouverez ci-dessous un exemple de test correct :
 * 
 * Détails de la solution :
 * Mock d'ElementRef : Nous créons une instance mock d'ElementRef avec un élément HTML générique (document.createElement('div')). 
 * Injection manuelle : Nous passons le mock au constructeur de la directive. 
 * Test du comportement : Nous simulons des clics à l'intérieur et à l'extérieur de l'élément pour vérifier que le comportement de la directive est correct. 
 * Ces changements assurent que la directive est testée de manière isolée sans erreurs de dépendance.*/